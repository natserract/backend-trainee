import Router from "@koa/router";
import { buildProviderModule } from "inversify-binding-decorators";

import { container } from "~/container";
import { UserController } from "~/modules/user/infra/http/controller/controller";

container.load(buildProviderModule());

const router = new Router();

// Resolves controller
const userController = container.get<UserController>(UserController);

router.get("/", userController.getAll);

export default router;
