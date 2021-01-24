// Generated by @compas/code-gen
/* eslint-disable no-unused-vars */

import { AppError, isNil, isPlainObject, isStaging } from "@compas/stdlib";
import { isQueryPart, query } from "@compas/store";
import {
  validateStoreFileGroupQueryBuilder,
  validateStoreFileGroupWhere,
} from "../validators.js";
import { fileOrderBy, internalQueryFile, transformFile } from "./file.js";

const fileGroupFieldSet = new Set([
  "name",
  "order",
  "meta",
  "id",
  "file",
  "parent",
  "createdAt",
  "updatedAt",
  "deletedAt",
]);
/**
 * Get all fields for fileGroup
 * @param {string} [tableName="fg."]
 * @param {{ excludePrimaryKey: boolean }} [options={}]
 * @returns {QueryPart}
 */
export function fileGroupFields(tableName = "fg.", options = {}) {
  if (tableName.length > 0 && !tableName.endsWith(".")) {
    tableName = `${tableName}.`;
  }
  if (options.excludePrimaryKey) {
    return query([
      `${tableName}"order", ${tableName}"file", ${tableName}"parent", ${tableName}"name", ${tableName}"meta", ${tableName}"createdAt", ${tableName}"updatedAt", ${tableName}"deletedAt"`,
    ]);
  }
  return query([
    `${tableName}"id", ${tableName}"order", ${tableName}"file", ${tableName}"parent", ${tableName}"name", ${tableName}"meta", ${tableName}"createdAt", ${tableName}"updatedAt", ${tableName}"deletedAt"`,
  ]);
}
/**
 * Get 'ORDER BY ' for fileGroup
 * @param {string} [tableName="fg."]
 * @returns {QueryPart}
 */
export function fileGroupOrderBy(tableName = "fg.") {
  if (tableName.length > 0 && !tableName.endsWith(".")) {
    tableName = `${tableName}.`;
  }
  const strings = [
    `${tableName}"createdAt", ${tableName}"updatedAt", ${tableName}"id" `,
  ];
  return query(strings);
}
/**
 * Build 'WHERE ' part for fileGroup
 * @param {StoreFileGroupWhere} [where={}]
 * @param {string} [tableName="fg."]
 * @param {{ skipValidator?: boolean }=} options
 * @returns {QueryPart}
 */
export function fileGroupWhere(where = {}, tableName = "fg.", options = {}) {
  if (tableName.length > 0 && !tableName.endsWith(".")) {
    tableName = `${tableName}.`;
  }
  if (!options.skipValidator) {
    where = validateStoreFileGroupWhere(where, "$.fileGroupWhere");
  }
  const strings = ["1 = 1"];
  const values = [undefined];
  if (Array.isArray(where.$or) && where.$or.length > 0) {
    strings.push(" AND ((");
    for (let i = 0; i < where.$or.length; i++) {
      values.push(fileGroupWhere(where.$or[i], tableName));
      if (i === where.$or.length - 1) {
        strings.push("))");
        values.push(undefined);
      } else {
        strings.push(") OR (");
      }
    }
  }
  if (where.id !== undefined) {
    strings.push(` AND ${tableName}"id" = `);
    values.push(where.id);
  }
  if (where.idNotEqual !== undefined) {
    strings.push(` AND ${tableName}"id" != `);
    values.push(where.idNotEqual);
  }
  if (where.idIn !== undefined) {
    if (isQueryPart(where.idIn)) {
      strings.push(` AND ${tableName}"id" = ANY(`, ")");
      values.push(where.idIn, undefined);
    } else if (Array.isArray(where.idIn) && where.idIn.length > 0) {
      strings.push(` AND ${tableName}"id" = ANY(ARRAY[`);
      for (let i = 0; i < where.idIn.length; ++i) {
        values.push(where.idIn[i]);
        if (i === where.idIn.length - 1) {
          strings.push("]::uuid[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.idNotIn !== undefined) {
    if (isQueryPart(where.idNotIn)) {
      strings.push(` AND ${tableName}"id" != ANY(`, ")");
      values.push(where.idNotIn, undefined);
    } else if (Array.isArray(where.idNotIn) && where.idNotIn.length > 0) {
      strings.push(` AND ${tableName}"id" != ANY(ARRAY[`);
      for (let i = 0; i < where.idNotIn.length; ++i) {
        values.push(where.idNotIn[i]);
        if (i === where.idNotIn.length - 1) {
          strings.push("]::uuid[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.idLike !== undefined) {
    strings.push(` AND ${tableName}"id" LIKE `);
    values.push(`%${where.idLike}%`);
  }
  if (where.idNotLike !== undefined) {
    strings.push(` AND ${tableName}"id" NOT LIKE `);
    values.push(`%${where.idNotLike}%`);
  }
  if (where.file !== undefined) {
    strings.push(` AND ${tableName}"file" = `);
    values.push(where.file);
  }
  if (where.fileNotEqual !== undefined) {
    strings.push(` AND ${tableName}"file" != `);
    values.push(where.fileNotEqual);
  }
  if (where.fileIn !== undefined) {
    if (isQueryPart(where.fileIn)) {
      strings.push(` AND ${tableName}"file" = ANY(`, ")");
      values.push(where.fileIn, undefined);
    } else if (Array.isArray(where.fileIn) && where.fileIn.length > 0) {
      strings.push(` AND ${tableName}"file" = ANY(ARRAY[`);
      for (let i = 0; i < where.fileIn.length; ++i) {
        values.push(where.fileIn[i]);
        if (i === where.fileIn.length - 1) {
          strings.push("]::uuid[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.fileNotIn !== undefined) {
    if (isQueryPart(where.fileNotIn)) {
      strings.push(` AND ${tableName}"file" != ANY(`, ")");
      values.push(where.fileNotIn, undefined);
    } else if (Array.isArray(where.fileNotIn) && where.fileNotIn.length > 0) {
      strings.push(` AND ${tableName}"file" != ANY(ARRAY[`);
      for (let i = 0; i < where.fileNotIn.length; ++i) {
        values.push(where.fileNotIn[i]);
        if (i === where.fileNotIn.length - 1) {
          strings.push("]::uuid[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.fileLike !== undefined) {
    strings.push(` AND ${tableName}"file" LIKE `);
    values.push(`%${where.fileLike}%`);
  }
  if (where.fileNotLike !== undefined) {
    strings.push(` AND ${tableName}"file" NOT LIKE `);
    values.push(`%${where.fileNotLike}%`);
  }
  if (where.fileIsNull !== undefined) {
    strings.push(` AND ${tableName}"file" IS NULL `);
    values.push(undefined);
  }
  if (where.fileIsNotNull !== undefined) {
    strings.push(` AND ${tableName}"file" IS NOT NULL `);
    values.push(undefined);
  }
  if (where.parent !== undefined) {
    strings.push(` AND ${tableName}"parent" = `);
    values.push(where.parent);
  }
  if (where.parentNotEqual !== undefined) {
    strings.push(` AND ${tableName}"parent" != `);
    values.push(where.parentNotEqual);
  }
  if (where.parentIn !== undefined) {
    if (isQueryPart(where.parentIn)) {
      strings.push(` AND ${tableName}"parent" = ANY(`, ")");
      values.push(where.parentIn, undefined);
    } else if (Array.isArray(where.parentIn) && where.parentIn.length > 0) {
      strings.push(` AND ${tableName}"parent" = ANY(ARRAY[`);
      for (let i = 0; i < where.parentIn.length; ++i) {
        values.push(where.parentIn[i]);
        if (i === where.parentIn.length - 1) {
          strings.push("]::uuid[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.parentNotIn !== undefined) {
    if (isQueryPart(where.parentNotIn)) {
      strings.push(` AND ${tableName}"parent" != ANY(`, ")");
      values.push(where.parentNotIn, undefined);
    } else if (
      Array.isArray(where.parentNotIn) &&
      where.parentNotIn.length > 0
    ) {
      strings.push(` AND ${tableName}"parent" != ANY(ARRAY[`);
      for (let i = 0; i < where.parentNotIn.length; ++i) {
        values.push(where.parentNotIn[i]);
        if (i === where.parentNotIn.length - 1) {
          strings.push("]::uuid[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.parentLike !== undefined) {
    strings.push(` AND ${tableName}"parent" LIKE `);
    values.push(`%${where.parentLike}%`);
  }
  if (where.parentNotLike !== undefined) {
    strings.push(` AND ${tableName}"parent" NOT LIKE `);
    values.push(`%${where.parentNotLike}%`);
  }
  if (where.parentIsNull !== undefined) {
    strings.push(` AND ${tableName}"parent" IS NULL `);
    values.push(undefined);
  }
  if (where.parentIsNotNull !== undefined) {
    strings.push(` AND ${tableName}"parent" IS NOT NULL `);
    values.push(undefined);
  }
  if (where.createdAt !== undefined) {
    strings.push(` AND ${tableName}"createdAt" = `);
    values.push(where.createdAt);
  }
  if (where.createdAtNotEqual !== undefined) {
    strings.push(` AND ${tableName}"createdAt" != `);
    values.push(where.createdAtNotEqual);
  }
  if (where.createdAtIn !== undefined) {
    if (isQueryPart(where.createdAtIn)) {
      strings.push(` AND ${tableName}"createdAt" = ANY(`, ")");
      values.push(where.createdAtIn, undefined);
    } else if (
      Array.isArray(where.createdAtIn) &&
      where.createdAtIn.length > 0
    ) {
      strings.push(` AND ${tableName}"createdAt" = ANY(ARRAY[`);
      for (let i = 0; i < where.createdAtIn.length; ++i) {
        values.push(where.createdAtIn[i]);
        if (i === where.createdAtIn.length - 1) {
          strings.push("]::timestamptz[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.createdAtNotIn !== undefined) {
    if (isQueryPart(where.createdAtNotIn)) {
      strings.push(` AND ${tableName}"createdAt" != ANY(`, ")");
      values.push(where.createdAtNotIn, undefined);
    } else if (
      Array.isArray(where.createdAtNotIn) &&
      where.createdAtNotIn.length > 0
    ) {
      strings.push(` AND ${tableName}"createdAt" != ANY(ARRAY[`);
      for (let i = 0; i < where.createdAtNotIn.length; ++i) {
        values.push(where.createdAtNotIn[i]);
        if (i === where.createdAtNotIn.length - 1) {
          strings.push("]::timestamptz[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.createdAtGreaterThan !== undefined) {
    strings.push(` AND ${tableName}"createdAt" > `);
    values.push(where.createdAtGreaterThan);
  }
  if (where.createdAtLowerThan !== undefined) {
    strings.push(` AND ${tableName}"createdAt" < `);
    values.push(where.createdAtLowerThan);
  }
  if (where.createdAtIsNull !== undefined) {
    strings.push(` AND ${tableName}"createdAt" IS NULL `);
    values.push(undefined);
  }
  if (where.createdAtIsNotNull !== undefined) {
    strings.push(` AND ${tableName}"createdAt" IS NOT NULL `);
    values.push(undefined);
  }
  if (where.updatedAt !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" = `);
    values.push(where.updatedAt);
  }
  if (where.updatedAtNotEqual !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" != `);
    values.push(where.updatedAtNotEqual);
  }
  if (where.updatedAtIn !== undefined) {
    if (isQueryPart(where.updatedAtIn)) {
      strings.push(` AND ${tableName}"updatedAt" = ANY(`, ")");
      values.push(where.updatedAtIn, undefined);
    } else if (
      Array.isArray(where.updatedAtIn) &&
      where.updatedAtIn.length > 0
    ) {
      strings.push(` AND ${tableName}"updatedAt" = ANY(ARRAY[`);
      for (let i = 0; i < where.updatedAtIn.length; ++i) {
        values.push(where.updatedAtIn[i]);
        if (i === where.updatedAtIn.length - 1) {
          strings.push("]::timestamptz[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.updatedAtNotIn !== undefined) {
    if (isQueryPart(where.updatedAtNotIn)) {
      strings.push(` AND ${tableName}"updatedAt" != ANY(`, ")");
      values.push(where.updatedAtNotIn, undefined);
    } else if (
      Array.isArray(where.updatedAtNotIn) &&
      where.updatedAtNotIn.length > 0
    ) {
      strings.push(` AND ${tableName}"updatedAt" != ANY(ARRAY[`);
      for (let i = 0; i < where.updatedAtNotIn.length; ++i) {
        values.push(where.updatedAtNotIn[i]);
        if (i === where.updatedAtNotIn.length - 1) {
          strings.push("]::timestamptz[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.updatedAtGreaterThan !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" > `);
    values.push(where.updatedAtGreaterThan);
  }
  if (where.updatedAtLowerThan !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" < `);
    values.push(where.updatedAtLowerThan);
  }
  if (where.updatedAtIsNull !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" IS NULL `);
    values.push(undefined);
  }
  if (where.updatedAtIsNotNull !== undefined) {
    strings.push(` AND ${tableName}"updatedAt" IS NOT NULL `);
    values.push(undefined);
  }
  if (where.deletedAt !== undefined) {
    strings.push(` AND ${tableName}"deletedAt" = `);
    values.push(where.deletedAt);
  }
  if (where.deletedAtNotEqual !== undefined) {
    strings.push(` AND ${tableName}"deletedAt" != `);
    values.push(where.deletedAtNotEqual);
  }
  if (where.deletedAtIn !== undefined) {
    if (isQueryPart(where.deletedAtIn)) {
      strings.push(` AND ${tableName}"deletedAt" = ANY(`, ")");
      values.push(where.deletedAtIn, undefined);
    } else if (
      Array.isArray(where.deletedAtIn) &&
      where.deletedAtIn.length > 0
    ) {
      strings.push(` AND ${tableName}"deletedAt" = ANY(ARRAY[`);
      for (let i = 0; i < where.deletedAtIn.length; ++i) {
        values.push(where.deletedAtIn[i]);
        if (i === where.deletedAtIn.length - 1) {
          strings.push("]::timestamptz[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.deletedAtNotIn !== undefined) {
    if (isQueryPart(where.deletedAtNotIn)) {
      strings.push(` AND ${tableName}"deletedAt" != ANY(`, ")");
      values.push(where.deletedAtNotIn, undefined);
    } else if (
      Array.isArray(where.deletedAtNotIn) &&
      where.deletedAtNotIn.length > 0
    ) {
      strings.push(` AND ${tableName}"deletedAt" != ANY(ARRAY[`);
      for (let i = 0; i < where.deletedAtNotIn.length; ++i) {
        values.push(where.deletedAtNotIn[i]);
        if (i === where.deletedAtNotIn.length - 1) {
          strings.push("]::timestamptz[])");
          values.push(undefined);
        } else {
          strings.push(", ");
        }
      }
    }
  }
  if (where.deletedAtGreaterThan !== undefined) {
    strings.push(` AND ${tableName}"deletedAt" > `);
    values.push(where.deletedAtGreaterThan);
  }
  if (where.deletedAtLowerThan !== undefined) {
    strings.push(` AND ${tableName}"deletedAt" < `);
    values.push(where.deletedAtLowerThan);
  }
  if ((where.deletedAtIncludeNotNull ?? false) === false) {
    strings.push(
      ` AND (${tableName}"deletedAt" IS NULL OR ${tableName}"deletedAt" > now()) `,
    );
    values.push(undefined);
  }
  strings.push("");
  return query(strings, ...values);
}
/**
 * Build 'VALUES ' part for fileGroup
 * @param {StoreFileGroupInsertPartial|StoreFileGroupInsertPartial[]} insert
 * @param {{ includePrimaryKey: boolean }} [options={}]
 * @returns {QueryPart}
 */
export function fileGroupInsertValues(insert, options = {}) {
  if (!Array.isArray(insert)) {
    insert = [insert];
  }
  const q = query``;
  for (let i = 0; i < insert.length; ++i) {
    const it = insert[i];
    checkFieldsInSet("fileGroup", "insert", fileGroupFieldSet, it);
    q.append(query`(
${options?.includePrimaryKey ? query`${it.id}, ` : undefined}
${it.order ?? Math.floor(Date.now() / 1000000)}, ${it.file ?? null}, ${
      it.parent ?? null
    }, ${it.name ?? null}, ${JSON.stringify(it.meta ?? {})}, ${
      it.createdAt ?? new Date()
    }, ${it.updatedAt ?? new Date()}, ${it.deletedAt ?? null}
)`);
    if (i !== insert.length - 1) {
      q.append(query`, `);
    }
  }
  return q;
}
/**
 * Build 'SET ' part for fileGroup
 * @param {StoreFileGroupUpdatePartial} update
 * @returns {QueryPart}
 */
export function fileGroupUpdateSet(update) {
  const strings = [];
  const values = [];
  checkFieldsInSet("fileGroup", "update", fileGroupFieldSet, update);
  if (update.order !== undefined) {
    strings.push(`, "order" = `);
    values.push(update.order ?? Math.floor(Date.now() / 1000000));
  }
  if (update.file !== undefined) {
    strings.push(`, "file" = `);
    values.push(update.file ?? null);
  }
  if (update.parent !== undefined) {
    strings.push(`, "parent" = `);
    values.push(update.parent ?? null);
  }
  if (update.name !== undefined) {
    strings.push(`, "name" = `);
    values.push(update.name ?? null);
  }
  if (update.meta !== undefined) {
    strings.push(`, "meta" = `);
    values.push(JSON.stringify(update.meta ?? {}));
  }
  if (update.createdAt !== undefined) {
    strings.push(`, "createdAt" = `);
    values.push(update.createdAt ?? new Date());
  }
  strings.push(`, "updatedAt" = `);
  values.push(new Date());
  if (update.deletedAt !== undefined) {
    strings.push(`, "deletedAt" = `);
    values.push(update.deletedAt ?? null);
  }
  // Remove the comma suffix
  strings[0] = strings[0].substring(2);
  strings.push("");
  return query(strings, ...values);
}
/**
 * @param {string} entity
 * @param {string} subType
 * @param {Set} set
 * @param {*} value
 */
function checkFieldsInSet(entity, subType, set, value) {
  if (isStaging()) {
    for (const key of Object.keys(value)) {
      if (!set.has(key) && value[key] !== undefined) {
        throw new AppError(`query.${entity}.${subType}Fields`, 500, {
          extraKey: key,
          knownKeys: [...set],
        });
      }
    }
  }
}
/**
 * @param {Postgres} sql
 * @param {StoreFileGroupWhere} [where]
 * @returns {Promise<StoreFileGroup[]>}
 */
export async function fileGroupSelect(sql, where) {
  const result = await query`
SELECT ${fileGroupFields()}
FROM "fileGroup" fg
WHERE ${fileGroupWhere(where)}
ORDER BY ${fileGroupOrderBy()}
`.exec(sql);
  transformFileGroup(result);
  return result;
}
/**
 * @param {Postgres} sql
 * @param {StoreFileGroupWhere} [where]
 * @returns {Promise<number>}
 */
export async function fileGroupCount(sql, where) {
  const [result] = await query`
SELECT COUNT(fg."id") as "countResult"
FROM "fileGroup" fg
WHERE ${fileGroupWhere(where)}
`.exec(sql);
  return Number(result?.countResult ?? "0");
}
/**
 * @param {Postgres} sql
 * @param {StoreFileGroupWhere} [where={}]
 * @returns {Promise<void>}
 */
export function fileGroupDeletePermanent(sql, where = {}) {
  where.deletedAtIncludeNotNull = true;
  return query`
DELETE FROM "fileGroup" fg
WHERE ${fileGroupWhere(where)}
`.exec(sql);
}
/**
 * @param {Postgres} sql
 * @param {StoreFileGroupInsertPartial|(StoreFileGroupInsertPartial[])} insert
 * @param {{ withPrimaryKey: boolean }=} options
 * @returns {Promise<StoreFileGroup[]>}
 */
export async function fileGroupInsert(sql, insert, options = {}) {
  if (insert === undefined || insert.length === 0) {
    return [];
  }
  options.withPrimaryKey = options.withPrimaryKey ?? false;
  const result = await query`
INSERT INTO "fileGroup" (${fileGroupFields("", {
    excludePrimaryKey: !options.withPrimaryKey,
  })})
VALUES ${fileGroupInsertValues(insert, {
    includePrimaryKey: options.withPrimaryKey,
  })}
RETURNING ${fileGroupFields("")}
`.exec(sql);
  transformFileGroup(result);
  return result;
}
/**
 * @param {Postgres} sql
 * @param {StoreFileGroupUpdatePartial} update
 * @param {StoreFileGroupWhere} [where={}]
 * @returns {Promise<StoreFileGroup[]>}
 */
export async function fileGroupUpdate(sql, update, where = {}) {
  const result = await query`
UPDATE "fileGroup" fg
SET ${fileGroupUpdateSet(update)}
WHERE ${fileGroupWhere(where)}
RETURNING ${fileGroupFields()}
`.exec(sql);
  transformFileGroup(result);
  return result;
}
/**
 * @param {Postgres} sql
 * @param {StoreFileGroupWhere} [where={}]
 * @param {{ skipCascade: boolean }} [options={}]
 * @returns {Promise<void>}
 */
export async function fileGroupDelete(sql, where = {}, options = {}) {
  const result = await query`
UPDATE "fileGroup" fg
SET "deletedAt" = now()
WHERE ${fileGroupWhere(where)}
RETURNING "id"
`.exec(sql);
  if (options.skipCascade || result.length === 0) {
    return;
  }
  const ids = result.map((it) => it.id);
  await Promise.all([fileGroupDelete(sql, { parentIn: ids })]);
}
/**
 * @param {StoreFileGroupQueryBuilder|StoreFileGroupQueryTraverser} [builder={}]
 * @param {QueryPart} wherePartial
 * @returns {QueryPart}
 */
export function internalQueryFileGroup2(builder = {}, wherePartial) {
  const joinQb = query``;
  if (builder.viaFile) {
    builder.where = builder.where ?? {};
    const offsetLimitQb = !isNil(builder.viaFile.offset)
      ? query`OFFSET ${builder.viaFile.offset}`
      : query``;
    if (!isNil(builder.viaFile.limit)) {
      offsetLimitQb.append(
        query`FETCH NEXT ${builder.viaFile.limit} ROWS ONLY`,
      );
    }
    builder.where.fileIn = query`
SELECT DISTINCT f."id"
${internalQueryFile(builder.viaFile)}
${offsetLimitQb}
`;
  }
  if (builder.viaParent) {
    builder.where = builder.where ?? {};
    const offsetLimitQb = !isNil(builder.viaParent.offset)
      ? query`OFFSET ${builder.viaParent.offset}`
      : query``;
    if (!isNil(builder.viaParent.limit)) {
      offsetLimitQb.append(
        query`FETCH NEXT ${builder.viaParent.limit} ROWS ONLY`,
      );
    }
    builder.where.parentIn = query`
SELECT DISTINCT fg."id"
${internalQueryFileGroup(builder.viaParent)}
${offsetLimitQb}
`;
  }
  if (builder.viaChildren) {
    builder.where = builder.where ?? {};
    const offsetLimitQb = !isNil(builder.viaChildren.offset)
      ? query`OFFSET ${builder.viaChildren.offset}`
      : query``;
    if (!isNil(builder.viaChildren.limit)) {
      offsetLimitQb.append(
        query`FETCH NEXT ${builder.viaChildren.limit} ROWS ONLY`,
      );
    }
    builder.where.idIn = query`
SELECT DISTINCT fg."parent"
${internalQueryFileGroup(builder.viaChildren)}
${offsetLimitQb}
`;
  }
  if (builder.file) {
    const joinedKeys = [];
    const offsetLimitQb = !isNil(builder.file.offset)
      ? query`OFFSET ${builder.file.offset}`
      : query``;
    if (!isNil(builder.file.limit)) {
      offsetLimitQb.append(query`FETCH NEXT ${builder.file.limit} ROWS ONLY`);
    }
    if (builder.file.group) {
      joinedKeys.push(
        `'${builder.file.group?.as ?? "group"}'`,
        '"ljl_0"."result"',
      );
    }
    if (builder.file.groupView) {
      joinedKeys.push(
        `'${builder.file.groupView?.as ?? "groupView"}'`,
        '"ljl_1"."result"',
      );
    }
    joinQb.append(query`LEFT JOIN LATERAL (
SELECT to_jsonb(f.*) || jsonb_build_object(${query([
      joinedKeys.join(","),
    ])}) as "result"
${internalQueryFile(builder.file, query`AND f."id" = fg2."file"`)}
ORDER BY ${fileOrderBy("f.")}
${offsetLimitQb}
) as "ljl_2" ON TRUE`);
  }
  if (builder.parent) {
    const joinedKeys = [];
    const offsetLimitQb = !isNil(builder.parent.offset)
      ? query`OFFSET ${builder.parent.offset}`
      : query``;
    if (!isNil(builder.parent.limit)) {
      offsetLimitQb.append(query`FETCH NEXT ${builder.parent.limit} ROWS ONLY`);
    }
    if (builder.parent.file) {
      joinedKeys.push(
        `'${builder.parent.file?.as ?? "file"}'`,
        '"ljl_2"."result"',
      );
    }
    if (builder.parent.parent) {
      joinedKeys.push(
        `'${builder.parent.parent?.as ?? "parent"}'`,
        '"ljl_3"."result"',
      );
    }
    if (builder.parent.children) {
      joinedKeys.push(
        `'${builder.parent.children?.as ?? "children"}'`,
        '"ljl_4"."result"',
      );
    }
    joinQb.append(query`LEFT JOIN LATERAL (
SELECT to_jsonb(fg.*) || jsonb_build_object(${query([
      joinedKeys.join(","),
    ])}) as "result"
${internalQueryFileGroup(builder.parent, query`AND fg."id" = fg2."parent"`)}
ORDER BY ${fileGroupOrderBy("fg.")}
${offsetLimitQb}
) as "ljl_3" ON TRUE`);
  }
  if (builder.children) {
    const joinedKeys = [];
    const offsetLimitQb = !isNil(builder.children.offset)
      ? query`OFFSET ${builder.children.offset}`
      : query``;
    if (!isNil(builder.children.limit)) {
      offsetLimitQb.append(
        query`FETCH NEXT ${builder.children.limit} ROWS ONLY`,
      );
    }
    if (builder.children.file) {
      joinedKeys.push(
        `'${builder.children.file?.as ?? "file"}'`,
        '"ljl_2"."result"',
      );
    }
    if (builder.children.parent) {
      joinedKeys.push(
        `'${builder.children.parent?.as ?? "parent"}'`,
        '"ljl_3"."result"',
      );
    }
    if (builder.children.children) {
      joinedKeys.push(
        `'${builder.children.children?.as ?? "children"}'`,
        '"ljl_4"."result"',
      );
    }
    joinQb.append(query`LEFT JOIN LATERAL (
SELECT array_remove(array_agg(to_jsonb(fg.*) || jsonb_build_object(${query([
      joinedKeys.join(","),
    ])}) ORDER BY ${fileGroupOrderBy("fg.")}), NULL) as "result"
${internalQueryFileGroup(builder.children, query`AND fg."parent" = fg2."id"`)}
GROUP BY fg2."id"
ORDER BY fg2."id"
${offsetLimitQb}
) as "ljl_4" ON TRUE`);
  }
  return query`
FROM "fileGroup" fg2
${joinQb}
WHERE ${fileGroupWhere(builder.where, "fg2.", {
    skipValidator: true,
  })} ${wherePartial}
`;
}
/**
 * @param {StoreFileGroupQueryBuilder|StoreFileGroupQueryTraverser} [builder={}]
 * @param {QueryPart} wherePartial
 * @returns {QueryPart}
 */
export function internalQueryFileGroup(builder = {}, wherePartial) {
  const joinQb = query``;
  if (builder.viaFile) {
    builder.where = builder.where ?? {};
    const offsetLimitQb = !isNil(builder.viaFile.offset)
      ? query`OFFSET ${builder.viaFile.offset}`
      : query``;
    if (!isNil(builder.viaFile.limit)) {
      offsetLimitQb.append(
        query`FETCH NEXT ${builder.viaFile.limit} ROWS ONLY`,
      );
    }
    builder.where.fileIn = query`
SELECT DISTINCT f."id"
${internalQueryFile(builder.viaFile)}
${offsetLimitQb}
`;
  }
  if (builder.viaParent) {
    builder.where = builder.where ?? {};
    const offsetLimitQb = !isNil(builder.viaParent.offset)
      ? query`OFFSET ${builder.viaParent.offset}`
      : query``;
    if (!isNil(builder.viaParent.limit)) {
      offsetLimitQb.append(
        query`FETCH NEXT ${builder.viaParent.limit} ROWS ONLY`,
      );
    }
    builder.where.parentIn = query`
SELECT DISTINCT fg2."id"
${internalQueryFileGroup2(builder.viaParent)}
${offsetLimitQb}
`;
  }
  if (builder.viaChildren) {
    builder.where = builder.where ?? {};
    const offsetLimitQb = !isNil(builder.viaChildren.offset)
      ? query`OFFSET ${builder.viaChildren.offset}`
      : query``;
    if (!isNil(builder.viaChildren.limit)) {
      offsetLimitQb.append(
        query`FETCH NEXT ${builder.viaChildren.limit} ROWS ONLY`,
      );
    }
    builder.where.idIn = query`
SELECT DISTINCT fg2."parent"
${internalQueryFileGroup2(builder.viaChildren)}
${offsetLimitQb}
`;
  }
  if (builder.file) {
    const joinedKeys = [];
    const offsetLimitQb = !isNil(builder.file.offset)
      ? query`OFFSET ${builder.file.offset}`
      : query``;
    if (!isNil(builder.file.limit)) {
      offsetLimitQb.append(query`FETCH NEXT ${builder.file.limit} ROWS ONLY`);
    }
    if (builder.file.group) {
      joinedKeys.push(
        `'${builder.file.group?.as ?? "group"}'`,
        '"ljl_0"."result"',
      );
    }
    if (builder.file.groupView) {
      joinedKeys.push(
        `'${builder.file.groupView?.as ?? "groupView"}'`,
        '"ljl_1"."result"',
      );
    }
    joinQb.append(query`LEFT JOIN LATERAL (
SELECT to_jsonb(f.*) || jsonb_build_object(${query([
      joinedKeys.join(","),
    ])}) as "result"
${internalQueryFile(builder.file, query`AND f."id" = fg."file"`)}
ORDER BY ${fileOrderBy("f.")}
${offsetLimitQb}
) as "ljl_2" ON TRUE`);
  }
  if (builder.parent) {
    const joinedKeys = [];
    const offsetLimitQb = !isNil(builder.parent.offset)
      ? query`OFFSET ${builder.parent.offset}`
      : query``;
    if (!isNil(builder.parent.limit)) {
      offsetLimitQb.append(query`FETCH NEXT ${builder.parent.limit} ROWS ONLY`);
    }
    if (builder.parent.file) {
      joinedKeys.push(
        `'${builder.parent.file?.as ?? "file"}'`,
        '"ljl_2"."result"',
      );
    }
    if (builder.parent.parent) {
      joinedKeys.push(
        `'${builder.parent.parent?.as ?? "parent"}'`,
        '"ljl_3"."result"',
      );
    }
    if (builder.parent.children) {
      joinedKeys.push(
        `'${builder.parent.children?.as ?? "children"}'`,
        '"ljl_4"."result"',
      );
    }
    joinQb.append(query`LEFT JOIN LATERAL (
SELECT to_jsonb(fg2.*) || jsonb_build_object(${query([
      joinedKeys.join(","),
    ])}) as "result"
${internalQueryFileGroup2(builder.parent, query`AND fg2."id" = fg."parent"`)}
ORDER BY ${fileGroupOrderBy("fg2.")}
${offsetLimitQb}
) as "ljl_3" ON TRUE`);
  }
  if (builder.children) {
    const joinedKeys = [];
    const offsetLimitQb = !isNil(builder.children.offset)
      ? query`OFFSET ${builder.children.offset}`
      : query``;
    if (!isNil(builder.children.limit)) {
      offsetLimitQb.append(
        query`FETCH NEXT ${builder.children.limit} ROWS ONLY`,
      );
    }
    if (builder.children.file) {
      joinedKeys.push(
        `'${builder.children.file?.as ?? "file"}'`,
        '"ljl_2"."result"',
      );
    }
    if (builder.children.parent) {
      joinedKeys.push(
        `'${builder.children.parent?.as ?? "parent"}'`,
        '"ljl_3"."result"',
      );
    }
    if (builder.children.children) {
      joinedKeys.push(
        `'${builder.children.children?.as ?? "children"}'`,
        '"ljl_4"."result"',
      );
    }
    joinQb.append(query`LEFT JOIN LATERAL (
SELECT array_remove(array_agg(to_jsonb(fg2.*) || jsonb_build_object(${query([
      joinedKeys.join(","),
    ])}) ORDER BY ${fileGroupOrderBy("fg2.")}), NULL) as "result"
${internalQueryFileGroup2(builder.children, query`AND fg2."parent" = fg."id"`)}
GROUP BY fg."id"
ORDER BY fg."id"
${offsetLimitQb}
) as "ljl_4" ON TRUE`);
  }
  return query`
FROM "fileGroup" fg
${joinQb}
WHERE ${fileGroupWhere(builder.where, "fg.", {
    skipValidator: true,
  })} ${wherePartial}
`;
}
/**
 * @typedef {StoreFileGroup} QueryResultStoreFileGroup
 * @property {QueryResultStoreFile|string|number} [file]
 * @property {QueryResultStoreFileGroup|string|number} [parent]
 * @property {QueryResultStoreFileGroup[]} [children]
 */
/**
 * Query Builder for fileGroup
 * Note that nested limit and offset don't work yet.
 * @param {StoreFileGroupQueryBuilder} [builder={}]
 * @returns {{
 *  exec: function(sql: Postgres): Promise<QueryResultStoreFileGroup[]>,
 *  execRaw: function(sql: Postgres): Promise<*[]>
 *  queryPart: QueryPart,
 * }}
 */
export function queryFileGroup(builder = {}) {
  const joinedKeys = [];
  validateStoreFileGroupQueryBuilder(builder, "$.fileGroupBuilder");
  if (builder.file) {
    joinedKeys.push(`'${builder.file?.as ?? "file"}'`, `"ljl_2"."result"`);
  }
  if (builder.parent) {
    joinedKeys.push(`'${builder.parent?.as ?? "parent"}'`, `"ljl_3"."result"`);
  }
  if (builder.children) {
    joinedKeys.push(
      `'${builder.children?.as ?? "children"}'`,
      `coalesce("ljl_4"."result", '{}')`,
    );
  }
  const qb = query`
SELECT to_jsonb(fg.*) || jsonb_build_object(${query([
    joinedKeys.join(","),
  ])}) as "result"
${internalQueryFileGroup(builder)}
ORDER BY ${fileGroupOrderBy()}
`;
  if (!isNil(builder.offset)) {
    qb.append(query`OFFSET ${builder.offset}`);
  }
  if (!isNil(builder.limit)) {
    qb.append(query`FETCH NEXT ${builder.limit} ROWS ONLY`);
  }
  return {
    execRaw: (sql) => qb.exec(sql),
    exec: (sql) => {
      return qb.exec(sql).then((result) => {
        transformFileGroup(result, builder);
        return result;
      });
    },
    get queryPart() {
      return qb;
    },
  };
}
/**
 * NOTE: At the moment only intended for internal use by the generated queries!
 * Transform results from the query builder that adhere to the known structure
 * of 'fileGroup' and its relations.
 * @param {*[]} values
 * @param {StoreFileGroupQueryBuilder=} builder
 */
export function transformFileGroup(values, builder = {}) {
  for (let i = 0; i < values.length; ++i) {
    let value = values[i];
    if (isPlainObject(value.result) && Object.keys(value).length === 1) {
      values[i] = value.result;
      value = value.result;
    }
    value.name = value.name ?? undefined;
    value.file = value.file ?? undefined;
    value.parent = value.parent ?? undefined;
    if (typeof value.createdAt === "string") {
      value.createdAt = new Date(value.createdAt);
    }
    if (typeof value.updatedAt === "string") {
      value.updatedAt = new Date(value.updatedAt);
    }
    value.deletedAt = value.deletedAt ?? undefined;
    if (typeof value.deletedAt === "string") {
      value.deletedAt = new Date(value.deletedAt);
    }
    value[builder.file?.as ?? "file"] =
      value[builder.file?.as ?? "file"] ?? undefined;
    if (isPlainObject(value[builder.file?.as ?? "file"])) {
      const arr = [value[builder.file?.as ?? "file"]];
      transformFile(arr, builder.file);
      value[builder.file?.as ?? "file"] = arr[0];
    }
    value[builder.parent?.as ?? "parent"] =
      value[builder.parent?.as ?? "parent"] ?? undefined;
    if (isPlainObject(value[builder.parent?.as ?? "parent"])) {
      const arr = [value[builder.parent?.as ?? "parent"]];
      transformFileGroup(arr, builder.parent);
      value[builder.parent?.as ?? "parent"] = arr[0];
    }
    value[builder.children?.as ?? "children"] =
      value[builder.children?.as ?? "children"] ?? undefined;
    if (Array.isArray(value[builder.children?.as ?? "children"])) {
      transformFileGroup(
        value[builder.children?.as ?? "children"],
        builder.children,
      );
    }
  }
}
