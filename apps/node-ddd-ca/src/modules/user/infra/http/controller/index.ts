import Router from "@koa/router";

import { UserController } from "~/modules/user/infra/http/controller/controller";
import container from "~/modules/user/infra/http/controller/controller_di";

const router = new Router();

// Resolves controller
const userController = container.get<UserController>(UserController);

router.get("/", userController.getAll);

export default router;
