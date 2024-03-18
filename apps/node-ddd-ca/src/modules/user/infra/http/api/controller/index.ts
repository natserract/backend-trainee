import Router from "@koa/router";

import { getAll } from "~/modules/user/infra/http/api/controller/get_all";

const router = new Router();

router.get("/", getAll);

export default router;
