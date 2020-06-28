import Axios from "axios";
import test from "tape";
import { closeTestApp, createTestAppAndClient, getApp } from "../index.js";

test("server/app", async (t) => {
  const app = getApp();
  const client = Axios.create();

  t.test("creat test app and client", async (t) => {
    await createTestAppAndClient(app, client);
    t.ok(app._server.listening);
  });

  t.test("health check", async (t) => {
    const response = await client.get("_health");
    t.equal(response.status, 200);
    t.equal(response.headers["content-length"], "0");
  });

  t.test("404 and error handling", async (t) => {
    try {
      await client.get("/nope");
      t.fail("404, so axios should have thrown");
    } catch ({ response }) {
      t.equal(response.status, 404);
      t.deepEqual(response.data, {
        key: "error.server.notFound",
        message: "error.server.notFound",
        info: {},
      });
    }
  });

  t.test("close _server", async (t) => {
    await closeTestApp(app);
    t.ok(!app._server.listening);
  });

  t.test("close _server when not listening", async (t) => {
    const result = closeTestApp(app);
    t.equal(result, undefined);
  });
});