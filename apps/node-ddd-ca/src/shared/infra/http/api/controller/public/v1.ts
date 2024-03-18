import Router from "@koa/router";

import usersRouter from "~/modules/user/infra/http/api/controller";

const router = new Router();

// Routes
router.use("/users", usersRouter.routes(), usersRouter.allowedMethods());

export default router;
