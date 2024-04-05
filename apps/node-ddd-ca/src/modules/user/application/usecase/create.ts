import { injectable, inject } from "tsyringe";
import { IUseCase, Result } from "types-ddd";
import { fromZodError } from "zod-validation-error";

import { User } from "~/modules/user/domain/entity/user";
import {
  CreateUserDTO,
  CreateUserDTOSchema,
} from "~/modules/user/application/dto/dto";
import { UserWriteRepository } from "~/modules/user/infra/persistence/repository/write";
import type { IUserCreateRepository } from "~/modules/user/domain/interface/repository";

@injectable()
export class UserCreateUseCase
  implements IUseCase<CreateUserDTO, Result<User, string>>
{
  constructor(
    @inject(UserWriteRepository) private repository: IUserCreateRepository
  ) {}

  async execute(dto: CreateUserDTO): Promise<Result<User, string>> {
    const schema = CreateUserDTOSchema.safeParse(dto);

    const isValidProps = schema.success;
    if (!isValidProps) {
      const validationError = fromZodError(schema.error);
      return Result.fail(validationError.toString());
    }

    const user = User.create({
      email: dto.email,
      password: dto.password,
      phone: dto.phone,
    });

    const createdUser = await this.repository.save(user.value());
    return Result.Ok(createdUser);
  }
}
