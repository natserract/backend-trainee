import type { Context } from "koa";

import Statuses from "~/shared/common/utils/statuses";
import { User } from "~/modules/user/infra/persistence/model/user";
import { UserReadRepository } from "~/modules/user/infra/persistence/repository/read";
import { UserReadCoordinator } from "~/modules/user/application/coordinator/read";

export const getAll = async (ctx: Context) => {
  const repository = new UserReadRepository(User, []);
  const coordinator = new UserReadCoordinator(repository);
  const users = await coordinator.getAll();

  ctx.status = Statuses.OK;
  ctx.body = {
    users,
  };
};
