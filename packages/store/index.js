import { dirnameForModule } from "@compas/stdlib";

export {
  newMinioClient,
  minio,
  ensureBucket,
  removeBucket,
  listObjects,
  removeBucketAndObjectsInBucket,
  copyAllObjects,
} from "./src/minio.js";

export { newPostgresConnection, postgres } from "./src/postgres.js";

export {
  cleanupTestPostgresDatabase,
  createTestPostgresDatabase,
  setPostgresDatabaseTemplate,
  cleanupPostgresDatabaseTemplate,
} from "./src/testing.js";

export {
  newMigrateContext,
  getMigrationsToBeApplied,
  runMigrations,
} from "./src/migrations.js";

export {
  createOrUpdateFile,
  copyFile,
  getFileStream,
  syncDeletedFiles,
} from "./src/files.js";

export {
  hoistChildrenToParent,
  updateFileGroupOrder,
  getNestedFileGroups,
} from "./src/file-group.js";

export { FileCache } from "./src/file-cache.js";

export {
  JobQueueWorker,
  addJobToQueue,
  addRecurringJobToQueue,
} from "./src/queue.js";

export { newSessionStore } from "./src/sessions.js";

export const migrations = `${dirnameForModule(import.meta)}/migrations`;
export { structure as storeStructure } from "./src/generated/index.js";

export {
  query,
  isQueryPart,
  stringifyQueryPart,
  explainAnalyzeQuery,
} from "./src/query.js";
export { setStoreQueries } from "./src/generated.js";
