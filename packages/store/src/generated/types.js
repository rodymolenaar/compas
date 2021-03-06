// Generated by @compas/code-gen
/* eslint-disable no-unused-vars */

// An export soo all things work correctly with linters, ts, ...
export const __generated__ = true;
/**
 * @typedef {import("@compas/code-gen").App} App
 */
/**
 * @typedef {import("@compas/code-gen").TypeCreator} TypeCreator
 */
/**
 * @typedef {import("@compas/code-gen").RouteCreator} RouteCreator
 */
/**
 * @typedef {import("@compas/store").Postgres} Postgres
 */
/**
 * @typedef import("@compas/store").QueryPart} QueryPart
 */
/**
 * @typedef import("@compas/store").Minio} Minio
 */
/**
 * @typedef {{"bucketName": string, "contentLength": number, "contentType": string, "name": string, "meta": StoreFileMeta, "id": string, "createdAt": Date, "updatedAt": Date, "deletedAt"?: undefined|Date, }} StoreFile
 */
/**
 * User definable, optional object to store whatever you want
 *
 * @typedef {{}} StoreFileMeta
 */
/**
 * @typedef {{"name"?: undefined|string, "order": number, "meta": StoreFileGroupMeta, "id": string, "file"?: undefined|string, "parent"?: undefined|string, "createdAt": Date, "updatedAt": Date, "deletedAt"?: undefined|Date, }} StoreFileGroup
 */
/**
 * User definable, optional object to store whatever you want
 *
 * @typedef {StoreFileMeta} StoreFileGroupMeta
 */
/**
 * @typedef {{"name"?: undefined|string, "order": number, "meta": StoreFileGroupMeta, "isDirectory": boolean, "id": string, "file"?: undefined|string, "parent"?: undefined|string, "createdAt": Date, "updatedAt": Date, "deletedAt"?: undefined|Date, }} StoreFileGroupView
 */
/**
 * @typedef {{"id": number, "isComplete": boolean, "priority": number, "scheduledAt": Date, "name": string, "data": *, "retryCount": number, "createdAt": Date, "updatedAt": Date, }} StoreJob
 */
/**
 * @typedef {{"years"?: undefined|number, "months"?: undefined|number, "days"?: undefined|number, "hours"?: undefined|number, "minutes"?: undefined|number, "seconds"?: undefined|number, }} StoreJobInterval
 */
/**
 * @typedef {{"expires": Date, "data": *, "id": string, "createdAt": Date, "updatedAt": Date, }} StoreSession
 */
/**
 * @typedef {{"$raw"?: undefined|QueryPart, "$or"?: undefined|(StoreFileWhere)[], "id"?: undefined|string, "idNotEqual"?: undefined|string, "idIn"?: undefined|(string)[]|QueryPart, "idNotIn"?: undefined|(string)[]|QueryPart, "idLike"?: undefined|string, "idNotLike"?: undefined|string, "bucketName"?: undefined|string, "bucketNameNotEqual"?: undefined|string, "bucketNameIn"?: undefined|(string)[]|QueryPart, "bucketNameNotIn"?: undefined|(string)[]|QueryPart, "bucketNameLike"?: undefined|string, "bucketNameILike"?: undefined|string, "bucketNameNotLike"?: undefined|string, "createdAt"?: undefined|Date, "createdAtNotEqual"?: undefined|Date, "createdAtIn"?: undefined|(Date)[]|QueryPart, "createdAtNotIn"?: undefined|(Date)[]|QueryPart, "createdAtGreaterThan"?: undefined|Date, "createdAtLowerThan"?: undefined|Date, "createdAtIsNull"?: undefined|boolean, "createdAtIsNotNull"?: undefined|boolean, "updatedAt"?: undefined|Date, "updatedAtNotEqual"?: undefined|Date, "updatedAtIn"?: undefined|(Date)[]|QueryPart, "updatedAtNotIn"?: undefined|(Date)[]|QueryPart, "updatedAtGreaterThan"?: undefined|Date, "updatedAtLowerThan"?: undefined|Date, "updatedAtIsNull"?: undefined|boolean, "updatedAtIsNotNull"?: undefined|boolean, "deletedAt"?: undefined|Date, "deletedAtNotEqual"?: undefined|Date, "deletedAtIn"?: undefined|(Date)[]|QueryPart, "deletedAtNotIn"?: undefined|(Date)[]|QueryPart, "deletedAtGreaterThan"?: undefined|Date, "deletedAtLowerThan"?: undefined|Date, "deletedAtIncludeNotNull"?: undefined|boolean, }} StoreFileWhere
 */
/**
 * @typedef {{"$raw"?: undefined|QueryPart, "$or"?: undefined|(StoreFileGroupWhere)[], "id"?: undefined|string, "idNotEqual"?: undefined|string, "idIn"?: undefined|(string)[]|QueryPart, "idNotIn"?: undefined|(string)[]|QueryPart, "idLike"?: undefined|string, "idNotLike"?: undefined|string, "file"?: undefined|string, "fileNotEqual"?: undefined|string, "fileIn"?: undefined|(string)[]|QueryPart, "fileNotIn"?: undefined|(string)[]|QueryPart, "fileLike"?: undefined|string, "fileNotLike"?: undefined|string, "fileIsNull"?: undefined|boolean, "fileIsNotNull"?: undefined|boolean, "parent"?: undefined|string, "parentNotEqual"?: undefined|string, "parentIn"?: undefined|(string)[]|QueryPart, "parentNotIn"?: undefined|(string)[]|QueryPart, "parentLike"?: undefined|string, "parentNotLike"?: undefined|string, "parentIsNull"?: undefined|boolean, "parentIsNotNull"?: undefined|boolean, "createdAt"?: undefined|Date, "createdAtNotEqual"?: undefined|Date, "createdAtIn"?: undefined|(Date)[]|QueryPart, "createdAtNotIn"?: undefined|(Date)[]|QueryPart, "createdAtGreaterThan"?: undefined|Date, "createdAtLowerThan"?: undefined|Date, "createdAtIsNull"?: undefined|boolean, "createdAtIsNotNull"?: undefined|boolean, "updatedAt"?: undefined|Date, "updatedAtNotEqual"?: undefined|Date, "updatedAtIn"?: undefined|(Date)[]|QueryPart, "updatedAtNotIn"?: undefined|(Date)[]|QueryPart, "updatedAtGreaterThan"?: undefined|Date, "updatedAtLowerThan"?: undefined|Date, "updatedAtIsNull"?: undefined|boolean, "updatedAtIsNotNull"?: undefined|boolean, "deletedAt"?: undefined|Date, "deletedAtNotEqual"?: undefined|Date, "deletedAtIn"?: undefined|(Date)[]|QueryPart, "deletedAtNotIn"?: undefined|(Date)[]|QueryPart, "deletedAtGreaterThan"?: undefined|Date, "deletedAtLowerThan"?: undefined|Date, "deletedAtIncludeNotNull"?: undefined|boolean, }} StoreFileGroupWhere
 */
/**
 * @typedef {{"$raw"?: undefined|QueryPart, "$or"?: undefined|(StoreFileGroupViewWhere)[], "id"?: undefined|string, "idNotEqual"?: undefined|string, "idIn"?: undefined|(string)[]|QueryPart, "idNotIn"?: undefined|(string)[]|QueryPart, "idLike"?: undefined|string, "idNotLike"?: undefined|string, "isDirectory"?: undefined|boolean, "file"?: undefined|string, "fileNotEqual"?: undefined|string, "fileIn"?: undefined|(string)[]|QueryPart, "fileNotIn"?: undefined|(string)[]|QueryPart, "fileLike"?: undefined|string, "fileNotLike"?: undefined|string, "fileIsNull"?: undefined|boolean, "fileIsNotNull"?: undefined|boolean, "parent"?: undefined|string, "parentNotEqual"?: undefined|string, "parentIn"?: undefined|(string)[]|QueryPart, "parentNotIn"?: undefined|(string)[]|QueryPart, "parentLike"?: undefined|string, "parentNotLike"?: undefined|string, "parentIsNull"?: undefined|boolean, "parentIsNotNull"?: undefined|boolean, "createdAt"?: undefined|Date, "createdAtNotEqual"?: undefined|Date, "createdAtIn"?: undefined|(Date)[]|QueryPart, "createdAtNotIn"?: undefined|(Date)[]|QueryPart, "createdAtGreaterThan"?: undefined|Date, "createdAtLowerThan"?: undefined|Date, "createdAtIsNull"?: undefined|boolean, "createdAtIsNotNull"?: undefined|boolean, "updatedAt"?: undefined|Date, "updatedAtNotEqual"?: undefined|Date, "updatedAtIn"?: undefined|(Date)[]|QueryPart, "updatedAtNotIn"?: undefined|(Date)[]|QueryPart, "updatedAtGreaterThan"?: undefined|Date, "updatedAtLowerThan"?: undefined|Date, "updatedAtIsNull"?: undefined|boolean, "updatedAtIsNotNull"?: undefined|boolean, "deletedAt"?: undefined|Date, "deletedAtNotEqual"?: undefined|Date, "deletedAtIn"?: undefined|(Date)[]|QueryPart, "deletedAtNotIn"?: undefined|(Date)[]|QueryPart, "deletedAtGreaterThan"?: undefined|Date, "deletedAtLowerThan"?: undefined|Date, "deletedAtIncludeNotNull"?: undefined|boolean, }} StoreFileGroupViewWhere
 */
/**
 * @typedef {{"$raw"?: undefined|QueryPart, "$or"?: undefined|(StoreJobWhere)[], "id"?: undefined|number, "idNotEqual"?: undefined|number, "idIn"?: undefined|(number)[]|QueryPart, "idNotIn"?: undefined|(number)[]|QueryPart, "idGreaterThan"?: undefined|number, "idLowerThan"?: undefined|number, "isComplete"?: undefined|boolean, "isCompleteIsNull"?: undefined|boolean, "isCompleteIsNotNull"?: undefined|boolean, "name"?: undefined|string, "nameNotEqual"?: undefined|string, "nameIn"?: undefined|(string)[]|QueryPart, "nameNotIn"?: undefined|(string)[]|QueryPart, "nameLike"?: undefined|string, "nameILike"?: undefined|string, "nameNotLike"?: undefined|string, "scheduledAt"?: undefined|Date, "scheduledAtNotEqual"?: undefined|Date, "scheduledAtIn"?: undefined|(Date)[]|QueryPart, "scheduledAtNotIn"?: undefined|(Date)[]|QueryPart, "scheduledAtGreaterThan"?: undefined|Date, "scheduledAtLowerThan"?: undefined|Date, "scheduledAtIsNull"?: undefined|boolean, "scheduledAtIsNotNull"?: undefined|boolean, "createdAt"?: undefined|Date, "createdAtNotEqual"?: undefined|Date, "createdAtIn"?: undefined|(Date)[]|QueryPart, "createdAtNotIn"?: undefined|(Date)[]|QueryPart, "createdAtGreaterThan"?: undefined|Date, "createdAtLowerThan"?: undefined|Date, "createdAtIsNull"?: undefined|boolean, "createdAtIsNotNull"?: undefined|boolean, "updatedAt"?: undefined|Date, "updatedAtNotEqual"?: undefined|Date, "updatedAtIn"?: undefined|(Date)[]|QueryPart, "updatedAtNotIn"?: undefined|(Date)[]|QueryPart, "updatedAtGreaterThan"?: undefined|Date, "updatedAtLowerThan"?: undefined|Date, "updatedAtIsNull"?: undefined|boolean, "updatedAtIsNotNull"?: undefined|boolean, }} StoreJobWhere
 */
/**
 * @typedef {{"$raw"?: undefined|QueryPart, "$or"?: undefined|(StoreSessionWhere)[], "id"?: undefined|string, "idNotEqual"?: undefined|string, "idIn"?: undefined|(string)[]|QueryPart, "idNotIn"?: undefined|(string)[]|QueryPart, "idLike"?: undefined|string, "idNotLike"?: undefined|string, "expires"?: undefined|Date, "expiresNotEqual"?: undefined|Date, "expiresIn"?: undefined|(Date)[]|QueryPart, "expiresNotIn"?: undefined|(Date)[]|QueryPart, "expiresGreaterThan"?: undefined|Date, "expiresLowerThan"?: undefined|Date, "createdAt"?: undefined|Date, "createdAtNotEqual"?: undefined|Date, "createdAtIn"?: undefined|(Date)[]|QueryPart, "createdAtNotIn"?: undefined|(Date)[]|QueryPart, "createdAtGreaterThan"?: undefined|Date, "createdAtLowerThan"?: undefined|Date, "createdAtIsNull"?: undefined|boolean, "createdAtIsNotNull"?: undefined|boolean, "updatedAt"?: undefined|Date, "updatedAtNotEqual"?: undefined|Date, "updatedAtIn"?: undefined|(Date)[]|QueryPart, "updatedAtNotIn"?: undefined|(Date)[]|QueryPart, "updatedAtGreaterThan"?: undefined|Date, "updatedAtLowerThan"?: undefined|Date, "updatedAtIsNull"?: undefined|boolean, "updatedAtIsNotNull"?: undefined|boolean, }} StoreSessionWhere
 */
/**
 * @typedef {{"id"?: undefined|string, "contentLength": number, "bucketName": string, "contentType": string, "name": string, "meta"?: undefined|{}, "createdAt"?: undefined|Date, "updatedAt"?: undefined|Date, "deletedAt"?: undefined|Date, }} StoreFileInsertPartial
 */
/**
 * @typedef {{"contentLength"?: undefined|number, "bucketName"?: undefined|string, "contentType"?: undefined|string, "name"?: undefined|string, "meta"?: undefined|{}, "createdAt"?: undefined|Date, "updatedAt"?: undefined|Date, "deletedAt"?: undefined|null|Date, }} StoreFileUpdatePartial
 */
/**
 * @typedef {{"id"?: undefined|string, "order"?: undefined|number, "file"?: undefined|string, "parent"?: undefined|string, "name"?: undefined|string, "meta"?: undefined|{}, "createdAt"?: undefined|Date, "updatedAt"?: undefined|Date, "deletedAt"?: undefined|Date, }} StoreFileGroupInsertPartial
 */
/**
 * @typedef {{"order"?: undefined|number, "file"?: undefined|null|string, "parent"?: undefined|null|string, "name"?: undefined|null|string, "meta"?: undefined|{}, "createdAt"?: undefined|Date, "updatedAt"?: undefined|Date, "deletedAt"?: undefined|null|Date, }} StoreFileGroupUpdatePartial
 */
/**
 * @typedef {{"id"?: undefined|number, "isComplete"?: undefined|boolean, "priority"?: undefined|number, "retryCount"?: undefined|number, "name": string, "scheduledAt"?: undefined|Date, "data"?: undefined|*, "createdAt"?: undefined|Date, "updatedAt"?: undefined|Date, }} StoreJobInsertPartial
 */
/**
 * @typedef {{"isComplete"?: undefined|boolean, "priority"?: undefined|number, "retryCount"?: undefined|number, "name"?: undefined|string, "scheduledAt"?: undefined|Date, "data"?: undefined|*, "createdAt"?: undefined|Date, "updatedAt"?: undefined|Date, }} StoreJobUpdatePartial
 */
/**
 * @typedef {{"id"?: undefined|string, "expires": Date, "data"?: undefined|*, "createdAt"?: undefined|Date, "updatedAt"?: undefined|Date, }} StoreSessionInsertPartial
 */
/**
 * @typedef {{"expires"?: undefined|Date, "data"?: undefined|*, "createdAt"?: undefined|Date, "updatedAt"?: undefined|Date, }} StoreSessionUpdatePartial
 */
/**
 * @typedef {{"where"?: undefined|StoreFileWhere, "as"?: undefined|string, "limit"?: undefined|number, "offset"?: undefined|number, "group"?: undefined|StoreFileGroupQueryBuilder, "viaGroup"?: undefined|StoreFileGroupQueryTraverser, "groupView"?: undefined|StoreFileGroupViewQueryBuilder, "viaGroupView"?: undefined|StoreFileGroupViewQueryTraverser, }} StoreFileQueryBuilder
 */
/**
 * @typedef {{"where"?: undefined|StoreFileGroupWhere, "as"?: undefined|string, "limit"?: undefined|number, "offset"?: undefined|number, "file"?: undefined|StoreFileQueryBuilder, "viaFile"?: undefined|StoreFileQueryTraverser, "parent"?: undefined|StoreFileGroupQueryBuilder, "viaParent"?: undefined|StoreFileGroupQueryTraverser, "children"?: undefined|StoreFileGroupQueryBuilder, "viaChildren"?: undefined|StoreFileGroupQueryTraverser, }} StoreFileGroupQueryBuilder
 */
/**
 * @typedef {{"where"?: undefined|StoreFileWhere, "limit"?: undefined|number, "offset"?: undefined|number, "viaGroup"?: undefined|StoreFileGroupQueryTraverser, "viaGroupView"?: undefined|StoreFileGroupViewQueryTraverser, }} StoreFileQueryTraverser
 */
/**
 * @typedef {{"where"?: undefined|StoreFileGroupWhere, "limit"?: undefined|number, "offset"?: undefined|number, "viaFile"?: undefined|StoreFileQueryTraverser, "viaParent"?: undefined|StoreFileGroupQueryTraverser, "viaChildren"?: undefined|StoreFileGroupQueryTraverser, }} StoreFileGroupQueryTraverser
 */
/**
 * @typedef {{"where"?: undefined|StoreFileGroupViewWhere, "limit"?: undefined|number, "offset"?: undefined|number, "viaFile"?: undefined|StoreFileQueryTraverser, "viaParent"?: undefined|StoreFileGroupViewQueryTraverser, "viaChildren"?: undefined|StoreFileGroupViewQueryTraverser, }} StoreFileGroupViewQueryTraverser
 */
/**
 * @typedef {{"where"?: undefined|StoreFileGroupViewWhere, "as"?: undefined|string, "limit"?: undefined|number, "offset"?: undefined|number, "file"?: undefined|StoreFileQueryBuilder, "viaFile"?: undefined|StoreFileQueryTraverser, "parent"?: undefined|StoreFileGroupViewQueryBuilder, "viaParent"?: undefined|StoreFileGroupViewQueryTraverser, "children"?: undefined|StoreFileGroupViewQueryBuilder, "viaChildren"?: undefined|StoreFileGroupViewQueryTraverser, }} StoreFileGroupViewQueryBuilder
 */
/**
 * @typedef {{"where"?: undefined|StoreJobWhere, "as"?: undefined|string, "limit"?: undefined|number, "offset"?: undefined|number, }} StoreJobQueryBuilder
 */
/**
 * @typedef {{"where"?: undefined|StoreJobWhere, "limit"?: undefined|number, "offset"?: undefined|number, }} StoreJobQueryTraverser
 */
/**
 * @typedef {{"where"?: undefined|StoreSessionWhere, "as"?: undefined|string, "limit"?: undefined|number, "offset"?: undefined|number, }} StoreSessionQueryBuilder
 */
/**
 * @typedef {{"where"?: undefined|StoreSessionWhere, "limit"?: undefined|number, "offset"?: undefined|number, }} StoreSessionQueryTraverser
 */
