import Koa from "koa";
import { injectable } from "tsyringe";
import http2 from "node:http2";
import fs from "node:fs";

import Config from "~/configs";
import { initDB, initMigration } from "~/shared/infra/db/config/config";
import { initModels } from "~/shared/infra/db/models/models";
import registerApplicationMiddlewares from "~/shared/infra/http/middleware";
import registerApplicationRouters from "~/shared/infra/http/controller";

type GetServerInstanceOptions = {
  http2?: boolean;
  https?: boolean;
};

type ListenOptions = {
  host?: string;
  port?: number;
};

@injectable()
export class HttpServer {
  constructor() {
    this.init();
  }

  private async init() {
    await initDB();
    await initMigration();
    await initModels();
  }

  public async startServer() {
    const server = await this.createServer({ http2: true });
    server.listen();
  }

  private async createServer(options: GetServerInstanceOptions) {
    const app = new Koa();
    const server = await this.getServerInstance(app, options);

    // Pre listen
    await registerApplicationMiddlewares(app);
    await registerApplicationRouters(app);

    function listen(listenOptions?: ListenOptions) {
      const port =
        listenOptions?.port ?? parseInt(Config.APP_PORT as string, 10);
      const host = listenOptions?.host ?? Config.APP_HOST;

      server.listen(port, host, () => {
        console.log(`Server available at http://localhost:${Config.APP_PORT}`);
      });
    }

    return { server, listen };
  }

  private async getServerInstance(
    base: Koa,
    options: GetServerInstanceOptions,
  ) {
    let server = null;

    const httpsOptions = options.https === true ? {} : options.https;
    if (httpsOptions) {
      throw new Error("Https not supported yet");
    }

    if (options.http2) {
      const options = {
        key: fs.readFileSync("./server.key"),
        cert: fs.readFileSync("./server.crt"),
      };
      server = http2.createSecureServer(options, base.callback());
    } else {
      server = base;
    }

    return server as Koa;
  }
}
