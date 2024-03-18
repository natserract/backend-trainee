import Koa from "koa";

const createKoaApp = () => {
  const app = new Koa();

  return app;
};

export default createKoaApp;
