import type * as Koa from "koa";

declare global {
  interface ServerContext extends Koa.Context {
    request: Koa.Request & {
      fields: {};
    };
  }
}
