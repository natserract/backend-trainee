import dotenv from "dotenv";
import Koa from "koa";
import { injectable, registry } from "tsyringe";

import { APP_PORT } from "~/configs/app_config";

import { initDB, initMigration } from "~/shared/infra/db/config/config";
import { initModels } from "~/shared/infra/db/models/models";

import registerApplicationMiddlewares from "~/shared/infra/http/middleware";
import registerApplicationRouters from "~/shared/infra/http/controller";
import { Logger, LOGGER_SYMBOLS } from "~/shared/packages/logger/logger";

dotenv.config();

@registry([
  {
    token: LOGGER_SYMBOLS,
    useClass: Logger,
  },
])
@injectable()
export class HttpServer extends Logger {
  constructor() {
    super("Application");
    this.init();
  }

  private async init() {
    await initDB();
    await initMigration();
    await initModels();
  }

  public async startServer() {
    const app = new Koa();

    await registerApplicationMiddlewares(app);
    await registerApplicationRouters(app);

    app.listen(APP_PORT, () => {
      this.log(`Server available at http://localhost:${APP_PORT}`);
    });
  }
}
