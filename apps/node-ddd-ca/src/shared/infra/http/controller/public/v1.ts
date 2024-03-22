import Router from "@koa/router";
import { container } from "tsyringe";

import { UserController } from "~/modules/user/infra/http/controller/controller";

const router = new Router();

// Resolve routers
const usersRouter = container.resolve(UserController).register();

// Routes
router.use("/users", usersRouter.routes(), usersRouter.allowedMethods());

export default router;
