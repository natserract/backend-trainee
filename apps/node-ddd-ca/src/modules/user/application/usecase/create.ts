import { injectable, inject } from "tsyringe";
import { IUseCase, Result } from "types-ddd";

import { UserWriteRepository } from "~/modules/user/infra/persistence/repository/write";
import type { IUserCreateRepository } from "~/modules/user/domain/interface/repository";
import { CreateUserDTO } from "~/modules/user/application/dto/dto";
import { User } from "~/modules/user/domain/entity/user";

@injectable()
export class UserCreateUseCase
  implements IUseCase<CreateUserDTO, Result<User>>
{
  constructor(
    @inject(UserWriteRepository) private repository: IUserCreateRepository,
  ) {}

  async execute(dto: CreateUserDTO): Promise<Result<User>> {
    const user = User.create({
      email: dto.email,
      credentialUuid: dto.credentialUuid,
      password: dto.password,
      phone: dto.phone,
    });

    if (user.isFail()) {
      return Result.fail(user.error());
    }

    const createdUser = await this.repository.create(user.value());
    return Result.Ok(createdUser);
  }
}
