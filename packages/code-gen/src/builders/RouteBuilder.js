import { isNil } from "@compas/stdlib";
import { lowerCaseFirst } from "../utils.js";
import { TypeBuilder } from "./TypeBuilder.js";
import { buildOrInfer } from "./utils.js";

export class RouteBuilder extends TypeBuilder {
  constructor(method, group, name, path) {
    super("route", group, name);

    this.data.method = method;
    this.data.path = path;
    this.data.tags = [];
    this.data.idempotent = false;

    this.queryBuilder = undefined;
    this.paramsBuilder = undefined;
    this.bodyBuilder = undefined;
    this.filesBuilder = undefined;
    this.responseBuilder = undefined;
  }

  /**
   * @param {string} values
   * @returns {RouteBuilder}
   */
  tags(...values) {
    for (const v of values) {
      this.data.tags.push(lowerCaseFirst(v));
    }

    return this;
  }

  /**
   * Guarantee to the client that this call does not have any side-effects.
   * Can only be used for "POST" requests. Doesn't do anything to the generated router,
   * but some clients may use it to their advantage like the react-query generator.
   *
   * @returns {RouteBuilder}
   */
  idempotent() {
    if (this.data.method !== "POST") {
      throw new Error(`Can only set idempotent on POST routes`);
    }
    this.data.idempotent = true;

    return this;
  }

  /**
   * @param {TypeBuilderLike} builder
   * @returns {RouteBuilder}
   */
  query(builder) {
    this.queryBuilder = builder;

    return this;
  }

  /**
   * @param {TypeBuilderLike} builder
   * @returns {RouteBuilder}
   */
  params(builder) {
    this.paramsBuilder = builder;

    return this;
  }

  /**
   * @param {TypeBuilderLike} builder
   * @returns {RouteBuilder}
   */
  body(builder) {
    if (["POST", "PUT", "PATCH", "DELETE"].indexOf(this.data.method) === -1) {
      throw new Error("Can only use body on POST, PUT, PATCH or DELETE routes");
    }

    this.bodyBuilder = builder;

    return this;
  }

  /**
   * @param {TypeBuilderLike} builder
   * @returns {RouteBuilder}
   */
  files(builder) {
    if (["POST", "PUT", "PATCH"].indexOf(this.data.method) === -1) {
      throw new Error("Can only use files on POST, PUT or PATCH routes");
    }

    this.filesBuilder = builder;

    return this;
  }

  /**
   * @param {TypeBuilderLike} builder
   * @returns {RouteBuilder}
   */
  response(builder) {
    this.responseBuilder = builder;

    return this;
  }

  build() {
    const result = super.build();

    if (this.bodyBuilder && this.filesBuilder) {
      throw new Error(
        `Route ${result.group} - ${result.name} can't have both body and files.`,
      );
    }

    if (this.queryBuilder) {
      result.query = buildOrInfer(this.queryBuilder);

      if (isNil(result.query.name)) {
        result.query.group = result.group;
        result.query.name = `${result.name}Query`;
      }
    }

    if (this.bodyBuilder) {
      result.body = buildOrInfer(this.bodyBuilder);

      if (isNil(result.body.name)) {
        result.body.group = result.group;
        result.body.name = `${result.name}Body`;
      }
    }

    if (this.filesBuilder) {
      result.files = buildOrInfer(this.filesBuilder);

      if (isNil(result.files.name)) {
        result.files.group = result.group;
        result.files.name = `${result.name}Files`;
      }
    }

    if (this.responseBuilder) {
      result.response = buildOrInfer(this.responseBuilder);

      if (isNil(result.response.name)) {
        result.response.group = result.group;
        result.response.name = `${result.name}Response`;
      }
    }

    const pathParamKeys = collectPathParams(result.path);

    if (this.paramsBuilder || pathParamKeys.length > 0) {
      const paramsResult = this.paramsBuilder
        ? buildOrInfer(this.paramsBuilder)
        : buildOrInfer({});
      paramsResult.group = result.group;
      paramsResult.name = `${result.name}Params`;

      for (const param of pathParamKeys) {
        if (isNil(paramsResult.keys?.[param])) {
          throw new Error(
            `Route ${result.group}->${result.name} is missing a type definition for '${param}' parameter.`,
          );
        }
      }

      for (const key of Object.keys(paramsResult.keys ?? {})) {
        if (pathParamKeys.indexOf(key) === -1) {
          throw new Error(
            `Route ${result.group}->${result.name} has type definition for '${key}' but is not found in the path: ${result.path}`,
          );
        }
      }

      result.params = paramsResult;
    }

    return result;
  }
}

/**
 * Collect all path params
 *
 * @param {string} path
 * @returns {string[]}
 */
function collectPathParams(path) {
  const keys = [];

  for (const part of path.split("/")) {
    if (part.startsWith(":")) {
      keys.push(part.substring(1));
    }
  }

  return keys;
}

export class RouteCreator {
  constructor(group, path) {
    this.data = {
      group,
      path,
    };

    if (this.data.path.startsWith("/")) {
      this.data.path = this.data.path.slice(1);
    }

    this.defaultTags = [];
    this.queryBuilder = undefined;
    this.paramsBuilder = undefined;
    this.bodyBuilder = undefined;
    this.filesBuilder = undefined;
    this.responseBuilder = undefined;
  }

  /**
   * @param {string} values
   * @returns {RouteCreator}
   */
  tags(...values) {
    this.defaultTags.push(...values);

    return this;
  }

  /**
   * @param {TypeBuilderLike} builder
   * @returns {RouteCreator}
   */
  query(builder) {
    this.queryBuilder = builder;

    return this;
  }

  /**
   * @param {TypeBuilderLike} builder
   * @returns {RouteCreator}
   */
  params(builder) {
    this.paramsBuilder = builder;

    return this;
  }

  /**
   * @param {TypeBuilderLike} builder
   * @returns {RouteCreator}
   */
  body(builder) {
    this.bodyBuilder = builder;

    return this;
  }

  /**
   * @param {TypeBuilderLike} builder
   * @returns {RouteCreator}
   */
  files(builder) {
    this.filesBuilder = builder;

    return this;
  }

  /**
   * @param {TypeBuilderLike} builder
   * @returns {RouteCreator}
   */
  response(builder) {
    this.responseBuilder = builder;

    return this;
  }

  /**
   * @param {string} name
   * @param {string} path
   * @returns {RouteCreator}
   */
  group(name, path) {
    return new RouteCreator(name, concatenateRoutePaths(this.data.path, path));
  }

  /**
   * @param {string} [path]
   * @param {string} [name]
   * @returns {RouteBuilder}
   */
  get(path, name) {
    return this.create(
      "GET",
      this.data.group,
      name || "get",
      concatenateRoutePaths(this.data.path, path || "/"),
    );
  }

  /**
   * @param {string} [path]
   * @param {string} [name]
   * @returns {RouteBuilder}
   */
  post(path, name) {
    return this.create(
      "POST",
      this.data.group,
      name || "post",
      concatenateRoutePaths(this.data.path, path || "/"),
    );
  }

  /**
   * @param {string} [path]
   * @param {string} [name]
   * @returns {RouteBuilder}
   */
  put(path, name) {
    return this.create(
      "PUT",
      this.data.group,
      name || "put",
      concatenateRoutePaths(this.data.path, path || "/"),
    );
  }

  /**
   * @param {string} [path]
   * @param {string} [name]
   * @returns {RouteBuilder}
   */
  patch(path, name) {
    return this.create(
      "PATCH",
      this.data.group,
      name || "patch",
      concatenateRoutePaths(this.data.path, path || "/"),
    );
  }

  /**
   * @param {string} [path]
   * @param {string} [name]
   * @returns {RouteBuilder}
   */
  delete(path, name) {
    return this.create(
      "DELETE",
      this.data.group,
      name || "delete",
      concatenateRoutePaths(this.data.path, path || "/"),
    );
  }

  /**
   * @param {string} [path]
   * @param {string} [name]
   * @returns {RouteBuilder}
   */
  head(path, name) {
    return this.create(
      "HEAD",
      this.data.group,
      name || "get",
      concatenateRoutePaths(this.data.path, path || "/"),
    );
  }

  /**
   * Create a new RouteBuilder and add the defaults if exists.
   *
   * @param {string} method
   * @param {string} group
   * @param {string} name
   * @param {string} path
   * @returns {RouteBuilder}
   */
  create(method, group, name, path) {
    const b = new RouteBuilder(method, group, name, path);

    b.tags(...this.defaultTags);

    if (!isNil(this.paramsBuilder)) {
      b.params(this.paramsBuilder);
    }

    if (!isNil(this.queryBuilder)) {
      b.query(this.queryBuilder);
    }

    if (
      !isNil(this.bodyBuilder) &&
      ["POST", "PUT", "PATCH", "DELETE"].indexOf(method) !== -1
    ) {
      b.body(this.bodyBuilder);
    }

    if (
      !isNil(this.filesBuilder) &&
      ["POST", "PUT", "PATCH"].indexOf(method) !== -1
    ) {
      b.files(this.filesBuilder);
    }

    if (!isNil(this.responseBuilder)) {
      b.response(this.responseBuilder);
    }

    return b;
  }
}

/**
 * @param {string} path1
 * @param {string} path2
 * @returns {string}
 */
function concatenateRoutePaths(path1, path2) {
  if (!path1.endsWith("/")) {
    path1 += "/";
  }
  if (path2.startsWith("/")) {
    path2 = path2.substring(1);
  }

  return path1 + path2;
}
