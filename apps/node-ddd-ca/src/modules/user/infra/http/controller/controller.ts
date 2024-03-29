import type { Context } from "koa";
import { injectable, inject } from "tsyringe";
import Router from "@koa/router";

import Statuses from "~/shared/common/utils/statuses";
import { UserGetAllUseCase } from "~/modules/user/application/usecase/get_all";
import { UserGetUseCase } from "~/modules/user/application/usecase/get";
import { BaseController } from "~/shared/infra/http/utils/base_controller";

@injectable()
export class UserController extends BaseController {
  private router: Router;

  constructor(
    @inject(UserGetAllUseCase) private userGetAllUseCase: UserGetAllUseCase,
    @inject(UserGetUseCase) private userGetUseCase: UserGetUseCase,
  ) {
    super();
    this.router = new Router();
  }

  register() {
    this.router.get("/", this.getAll);
    this.router.get("/:userId", this.get);

    return this.router;
  }

  getAll = async (ctx: Context) => {
    const users = await this.userGetAllUseCase.execute();

    ctx.status = Statuses.OK;
    ctx.body = {
      users,
    };
  };

  get = async (ctx: Context) => {
    try {
      const userId = parseInt(ctx.params.id);
      const user = await this.userGetUseCase.execute(userId);

      ctx.status = Statuses.OK;
      ctx.body = {
        user,
      };
    } catch (error) {
      ctx.status = Statuses.SERVER_ERROR;
      ctx.body = {
        error: "An error occurred while retrieving the user.",
      };
    }
  };
}
