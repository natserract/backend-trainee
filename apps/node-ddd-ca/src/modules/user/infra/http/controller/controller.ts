import type { Context } from "koa";
import { injectable, inject } from "inversify";

import Statuses from "~/shared/common/utils/statuses";
import { UserGetAllUseCase } from "~/modules/user/application/usecase/get_all";
import { UserGetUseCase } from "~/modules/user/application/usecase/get";

@injectable()
export class UserController {
  constructor(
    @inject(UserGetAllUseCase) private userGetAllUseCase: UserGetAllUseCase,
    @inject(UserGetUseCase) private userGetUseCase: UserGetUseCase,
  ) {}

  async getAll(ctx: Context) {
    try {
      const users = await this.userGetAllUseCase.execute();
      ctx.status = Statuses.OK;
      ctx.body = {
        users,
      };
    } catch (error) {
      ctx.status = Statuses.SERVER_ERROR;
      ctx.body = {
        error: "An error occurred while retrieving users.",
      };
    }
  }

  async get(ctx: Context) {
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
  }
}
