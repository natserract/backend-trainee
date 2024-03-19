import Router from "@koa/router";

import { UserController } from "~/modules/user/infra/http/api/controller/controller";
import container from "~/modules/user/infra/http/api/controller/dependency_injection";

const router = new Router();

// Resolves controller
const userController = container.get<UserController>(UserController);

router.get("/", userController.getAll);

export default router;
