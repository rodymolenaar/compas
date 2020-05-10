import { App, generators, TypeCreator } from "@lbu/code-gen";
import { log } from "@lbu/insight";
import { mainFn } from "@lbu/stdlib";

mainFn(import.meta, log, main);

export const nodemonArgs = "--ignore generated --ignore stubs -e tmpl,js,json";

async function main() {
  const app = new App({
    generators: [
      generators.type,
      generators.validator,
      generators.mock,
      generators.router,
      generators.apiClient,
    ],
    verbose: true,
  });
  await app.init();

  const M = new TypeCreator();

  app.add(
    M.bool("Foo").optional().convert().default(true),
    M.anyOf("Bar", M.reference("app", "foo"), M.string()),
  );

  app.add(M.bool("Foo").optional().convert().default(true));
  app.add(M.anyOf("Bar", M.bool(), M.bool().optional().default(true)));
  app.add(
    M.object("Obj").keys({
      foo: M.array(M.number().optional()),
    }),
  );

  app.add(M.string("Str"));
  app.add(
    M.object("Objec", {
      str: M.reference("App", "Str"),
    }),
  );
  app.add(
    M.object("User", {
      id: M.uuid(),
      name: M.string().min(1).max(15).mock("__.first"),
      age: M.number().integer().min(0).max(150).convert().mock("__.age"),
    }),
  );

  app.add(
    M.object("Items", {
      userId: M.reference("App", "User"),
      name: M.string(),
      count: M.number().integer(),
      createdAt: M.date().defaultToNow(),
      updatedAt: M.date(),
    }),
  );

  const myGeneric = M.generic("MyGeneric")
    .keys(M.string())
    .values(M.anyOf([M.bool().convert(), M.number()]))
    .docs("Foo");

  app.add(M.array("GenericArray").values(myGeneric));

  const T = new TypeCreator("Todo");

  app.add(T.bool("Boolean"));
  app.add(T.array("MyArr").values(T.reference("App", "Items")));

  const G = T.router("/foo");
  app.add(G.get().query(M.reference("App", "User")));
  app.add(
    G.post("/:id")
      .body(
        M.object({
          foo: M.string(),
        }),
      )
      .query(
        M.object({
          id: M.bool().convert(),
        }),
      )
      .response(
        M.object().keys({
          bar: M.string(),
        }),
      ),
  );

  app.add(
    M.object("Foo", {
      bar: M.reference("App", "User").field("id"),
    }),
  );

  await app.generate({
    outputDirectory: "./generated",
    useTypescript: false,
  });

  await app.generateStubs({
    outputDirectory: "./stubs/app_stubs_api",
    group: "app",
    generators: ["type", "mock", "router"],
    useTypescript: false,
    dumpStructure: true,
  });

  await app.generateStubs({
    outputDirectory: "./stubs/todo_stubs_api",
    group: "todo",
    generators: ["type", "mock", "router", "apiClient"],
    useTypescript: false,
    dumpStructure: true,
  });
}
