import { createHash } from "crypto";
import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
import { pathToFileURL } from "url";
import {
  AppError,
  dirnameForModule,
  environment,
  pathJoin,
} from "@compas/stdlib";

/**
 * Create a new  migration context, resolves all migrations and collects the current
 * migration state.
 *
 * @since 0.1.0
 *
 * @param {Postgres} sql
 * @param {string} migrationDirectory
 * @returns {Promise<MigrateContext>}
 */
export async function newMigrateContext(
  sql,
  migrationDirectory = `${process.cwd()}/migrations`,
) {
  try {
    const migrations = await readMigrationsDir(migrationDirectory);

    // Automatically add this package to the migrations,
    // and make sure it is at the front
    const storeMigrationIndex = migrations.namespaces.indexOf("@compas/store");
    if (storeMigrationIndex !== 0) {
      if (storeMigrationIndex !== -1) {
        migrations.namespaces.splice(storeMigrationIndex, 1);
        migrations.namespaces.unshift("@compas/store");
      } else {
        migrations.namespaces.unshift("@compas/store");

        const { migrationFiles } = await readMigrationsDir(
          `${dirnameForModule(import.meta)}/../migrations`,
          "@compas/store",
          migrations.namespaces,
        );

        migrations.migrationFiles.push(...migrationFiles);
      }
    }

    const mc = {
      files: sortMigrations(migrations.namespaces, migrations.migrationFiles),
      namespaces: migrations.namespaces,
      sql,
      storedHashes: {},
    };

    await Promise.race([
      acquireLock(sql),
      new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Could not acquire advisory lock")),
          2500,
        );
      }),
    ]);
    await syncWithSchemaState(mc);
    return mc;
  } catch (error) {
    // Help user by dropping the sql connection so the application will exit
    await sql?.end();
    if (AppError.instanceOf(error)) {
      throw error;
    } else {
      throw new AppError(
        "store.migrateContext.error",
        500,
        {
          message: "Could not create migration context",
        },
        error,
      );
    }
  }
}

/**
 * Get the migrations to be applied from the provided migration context.
 * Note that 'repeatable' migrations are always in both the `migrationQueue` and
 * `hashChanges`.
 *
 * @since 0.1.0
 *
 * @param {MigrateContext} mc
 * @returns {{
 *   migrationQueue: ({ namespace: string, name: string, number: number, repeatable:
 *   boolean}[]), hashChanges: { name: string, number: number, namespace: string }[]
 * }}
 */
export function getMigrationsToBeApplied(mc) {
  const migrationQueue = filterMigrationsToBeApplied(mc).map((it) => ({
    namespace: it.namespace,
    name: it.name,
    number: it.number,
    repeatable: it.repeatable,
  }));

  const hashChanges = [];
  for (const it of mc.files) {
    if (
      it.isMigrated &&
      mc.storedHashes[`${it.namespace}-${it.number}`] !== it.hash
    ) {
      hashChanges.push({
        namespace: it.namespace,
        name: it.name,
        number: it.number,
      });
    }
  }

  return {
    migrationQueue,
    hashChanges,
  };
}

/**
 * Run the migrations currently pending in the migration context.
 *
 * @since 0.1.0
 *
 * @param {MigrateContext} mc
 * @returns {Promise<undefined>}
 */
export async function runMigrations(mc) {
  let current;
  try {
    const migrationFiles = filterMigrationsToBeApplied(mc);

    for (const migration of migrationFiles) {
      current = migration;
      await runMigration(mc.sql, migration);
    }
  } catch (error) {
    // Help user by dropping the sql connection so the application will exit
    await mc?.sql?.end();
    if (AppError.instanceOf(error)) {
      throw error;
    } else {
      throw new AppError(
        "store.migrateRun.error",
        500,
        {
          message: "Could not run migration",
          namespace: current?.namespace,
          number: current?.number,
          name: current?.name,
          postgres: {
            severity_local: error?.severity_local,
            severity: error?.severity,
            code: error?.code,
            position: error?.position,
            file: error?.file,
            line: error?.line,
            routine: error?.routine,
          },
        },
        error,
      );
    }
  }
}

/**
 * @param {MigrateContext} mc
 * @returns {MigrateFile[]}
 */
function filterMigrationsToBeApplied(mc) {
  const result = [];
  for (const f of mc.files) {
    if (!f.isMigrated) {
      result.push(f);
    } else if (
      mc.storedHashes[`${f.namespace}-${f.number}`] !== f.hash &&
      f.repeatable
    ) {
      result.push(f);
    }
  }

  return result;
}

/**
 * @param {Postgres} sql
 * @param {MigrateFile} migration
 * @returns {Promise<void>}
 */
async function runMigration(sql, migration) {
  const useTransaction =
    migration.source.indexOf("-- disable auto transaction") === -1;

  if (useTransaction) {
    await sql.begin(async (sql) => [
      await sql.unsafe(migration.source),
      await runInsert(sql, migration),
    ]);
  } else {
    await sql.unsafe(migration.source);
    await runInsert(sql, migration);
  }
}

/**
 * @param {Postgres} sql
 * @param {MigrateFile} migration
 */
async function runInsert(sql, migration) {
  return sql`
     INSERT INTO migration ${sql(
       migration,
       "namespace",
       "name",
       "number",
       "hash",
     )}
   `;
}

/**
 * @param {MigrateContext} mc
 * @returns {Promise<void>}
 */
async function syncWithSchemaState(mc) {
  let rows = [];
  try {
    rows = await mc.sql`
        SELECT DISTINCT ON (namespace, number) namespace,
                                               number,
                                               hash
        FROM migration
        ORDER BY namespace, number, "createdAt" DESC
      `;
  } catch (e) {
    if ((e.message ?? "").indexOf(`"migration" does not exist`) === -1) {
      throw new AppError(
        "store.migrateSync.error",
        500,
        {
          message: "Could not read existing migration table",
        },
        e,
      );
    }
    return;
  }

  const migrationData = {};
  for (const row of rows) {
    if (!migrationData[row.namespace]) {
      migrationData[row.namespace] = [];
    }
    migrationData[row.namespace].push(row.number);

    mc.storedHashes[`${row.namespace}-${row.number}`] = row.hash;
  }

  for (const mF of mc.files) {
    if (
      migrationData[mF.namespace] &&
      migrationData[mF.namespace].indexOf(mF.number) !== -1
    ) {
      mF.isMigrated = true;
    }
  }
}

/**
 * @param sql
 */
async function acquireLock(sql) {
  // Should be automatically released by Postgres once this connection ends.
  // We expect that the user runs this process for migrations only
  let locked = false;
  while (!locked) {
    const [result] = await sql`SELECT pg_try_advisory_lock(-9876453452)`;
    if (result.pg_try_advisory_lock) {
      locked = true;
    }
  }
}

/**
 *
 * @param directory
 * @param {string} namespace
 * @param {string[]} namespaces
 * @returns {Promise<{migrationFiles: [], namespaces: [*]}>}
 */
async function readMigrationsDir(
  directory,
  namespace = environment.APP_NAME,
  namespaces = [environment.APP_NAME],
) {
  if (!existsSync(directory)) {
    return {
      namespaces: [],
      migrationFiles: [],
    };
  }

  const files = await readdir(directory);
  const result = [];

  for (const f of files) {
    const fullPath = pathJoin(directory, f);

    if (f === "namespaces.txt") {
      const rawNamespaces = await readFile(fullPath, "utf-8");
      const subNamespaces = rawNamespaces
        .split("\n")
        .map((it) => it.trim())
        .filter((it) => it.length > 0);

      for (const sub of subNamespaces) {
        if (namespaces.indexOf(sub) !== -1) {
          continue;
        }

        namespaces.unshift(sub);

        // Either same level in node_modules
        const directPath = pathJoin(process.cwd(), "node_modules", sub);
        // Or a level deeper
        const indirectPath = pathJoin(directory, "../node_modules", sub);

        const subPath = !existsSync(directPath)
          ? existsSync(indirectPath)
            ? indirectPath
            : new Error(
                `Could not determine import path of ${sub}, while searching for migration files.`,
              )
          : directPath;

        // Quick hack
        if (typeof subPath !== "string") {
          throw subPath;
        }

        // Use the package.json to find the package entrypoint
        // Only supporting simple { exports: "file.js" }, { exports: { default:
        // "file.js" } or { main: "file.js" }
        const subPackageJson = JSON.parse(
          await readFile(pathJoin(subPath, "package.json"), "utf8"),
        );

        const exportedItems = await import(
          pathToFileURL(
            pathJoin(
              subPath,
              subPackageJson?.exports?.default ??
                (typeof subPackageJson?.exports === "string"
                  ? subPackageJson?.exports
                  : undefined) ??
                subPackageJson?.main ??
                "index.js",
            ),
          )
        );
        if (exportedItems && exportedItems.migrations) {
          const subResult = await readMigrationsDir(
            exportedItems.migrations,
            sub,
            namespaces,
          );
          result.push(...subResult.migrationFiles);
        }
      }
      continue;
    }

    const { number, repeatable, name } = parseFileName(f);
    const source = await readFile(fullPath, "utf-8");
    const hash = createHash("sha1").update(source, "utf-8").digest("hex");
    result.push({
      namespace,
      number,
      repeatable,
      name,
      fullPath,
      isMigrated: false,
      source,
      hash,
    });
  }

  return {
    migrationFiles: result,
    namespaces,
  };
}

/**
 * @param namespaces
 * @param files
 */
function sortMigrations(namespaces, files) {
  return files.sort((a, b) => {
    const namespaceResult =
      namespaces.indexOf(a.namespace) - namespaces.indexOf(b.namespace);

    if (namespaceResult !== 0) {
      return namespaceResult;
    }

    return a.number < b.number;
  });
}

/**
 * @param fileName
 */
function parseFileName(fileName) {
  const filePattern = /(\d+)(-r)?-([a-zA-Z-]+).sql/g;
  filePattern.lastIndex = 0;

  if (!fileName.endsWith(".sql")) {
    throw new Error(
      `migration: Only supports migrating sql files: ${fileName}`,
    );
  }

  filePattern.lastIndex = 0;
  if (!filePattern.test(fileName)) {
    throw new Error(
      `migration: only supports the following file pattern: '000-my-name.sql' or '001-r-name.sql' for repeatable migrations`,
    );
  }

  filePattern.lastIndex = 0;
  const [, number, repeatable, name] = filePattern.exec(fileName);

  return {
    number: Number(number),
    name,
    repeatable: !!repeatable,
  };
}
