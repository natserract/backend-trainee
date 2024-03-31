import type { Context, Next } from "koa";
import { injectable, inject } from "tsyringe";
import Router from "@koa/router";

import HttpStatus from "~/shared/common/enums/http_status";
import { UserGetAllUseCase } from "~/modules/user/application/usecase/get_all";
import { UserGetUseCase } from "~/modules/user/application/usecase/get";
import { BaseController } from "~/shared/infra/http/utils/base_controller";
import {
  GetAllResponseSchema,
  GetAllResponse,
} from "~/modules/user/infra/http/contract/api";
import { asyncLocalStorage } from "~/shared/infra/http/store";

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

    // resolve :userId
    this.router.use("/:userId", async (ctx: Context, next: Next) => {
      if (!ctx.params.userId) {
        return await next();
      }

      const userId = parseInt(ctx.params.userId);
      const user = await this.userGetUseCase.execute(userId);

      const store = asyncLocalStorage.get();
      await asyncLocalStorage.run(
        {
          ...store!,
          user,
        },
        next,
      );
    });

    this.router.get("/:userId", this.get);

    return this.router;
  }

  getAll = async (ctx: Context) => {
    const users = await this.userGetAllUseCase.execute();

    ctx.status = HttpStatus.OK;
    ctx.body = this.generateResponse<GetAllResponse>(GetAllResponseSchema, {
      users,
    });
  };

  get = async (ctx: Context) => {
    try {
      const user = asyncLocalStorage.get()!.user!;

      ctx.status = HttpStatus.OK;
      ctx.body = {
        user,
      };
    } catch (error) {
      ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
      ctx.body = {
        error: "An error occurred while retrieving the user.",
      };
    }
  };
}
