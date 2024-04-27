import Koa from "koa";
import Router from "@koa/router";
import type { Context } from "koa";

const registerApplicationRouters = async (app: Koa) => {
  const router = new Router();
  router.get("/", function (ctx: Context) {
    ctx.body = "Support HTTP2";
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
};

export default registerApplicationRouters;
