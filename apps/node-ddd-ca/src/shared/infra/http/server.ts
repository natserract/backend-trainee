import dotenv from "dotenv";
import Koa from "koa";
import { buildProviderModule } from "inversify-binding-decorators";

import { APP_PORT } from "~/configs/app_config";

import { initDB, initMigration } from "~/shared/infra/db/config/config";
import { initModels } from "~/shared/infra/db/models/models";

import registerApplicationMiddlewares from "~/shared/infra/http/middleware";
import registerApplicationRouters from "~/shared/infra/http/controller";
import { container } from "~/container";

dotenv.config();
container.load(buildProviderModule());

export const bootstrap = async () => {
  await initDB();
  await initMigration();
  await initModels();

  const app = new Koa();

  // DI Container
  // container.load(buildProviderModule());

  await registerApplicationMiddlewares(app);
  await registerApplicationRouters(app);

  app.listen(APP_PORT, () => {
    console.log(`Server available at http://localhost:${APP_PORT}`);
  });
};
