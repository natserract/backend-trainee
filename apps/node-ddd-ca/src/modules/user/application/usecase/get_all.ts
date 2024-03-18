import { UserModel } from "~/modules/user/application/model/user";
import { UserEntity } from "~/modules/user/application/entity/user";
import { UserRepository } from "~/modules/user/infra/persistence/repository/repository";

export class UserGetAllUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute() {
    const users = await this.repository.getAll();
    return users.map((user) => this.mapToDTO(user));
  }

  mapToDTO(user: UserModel) {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
    };
  }

  mapToDomain(model: UserModel): UserEntity {
    return new UserEntity(
      model.id,
      model.credentialUuid,
      model.email,
      model.phone,
    );
  }
}
