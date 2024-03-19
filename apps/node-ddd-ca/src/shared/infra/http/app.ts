import { APP_PORT } from "~/configs/app_config";

import { initDB, initMigration } from "~/shared/infra/db/config/config";
import { initModels } from "~/shared/infra/db/models/models";
import registerApplicationMiddlewares from "~/shared/infra/http/middleware";
import registerApplicationRouters from "~/shared/infra/http/controller";
import createKoaApp from "~/shared/infra/http/server/koa";
import { loadEnv } from "~/shared/common/utils/env";

export const createServer = async () => {
  await loadEnv();
  await initDB();
  await initMigration();
  await initModels();

  const app = createKoaApp();
  await registerApplicationMiddlewares(app);
  await registerApplicationRouters(app);

  app.listen(APP_PORT, () => {
    console.log(`Server available at http://localhost:${APP_PORT}`);
  });
};
