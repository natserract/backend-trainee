import type { Context } from "koa";

import Statuses from "~/shared/common/utils/statuses";
import { User } from "~/modules/user/application/model/user";
import { UserRepository } from "~/modules/user/infra/persistence/repository/repository";
import { UserGetAllUseCase } from "~/modules/user/application/usecase/get_all";

export const getAll = async (ctx: Context) => {
  const repository = new UserRepository(User, []);
  const useCase = new UserGetAllUseCase(repository);
  const users = await useCase.execute();

  ctx.status = Statuses.OK;
  ctx.body = {
    users,
  };
};
