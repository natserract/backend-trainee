import { Entity, EntityProps, Result } from "types-ddd";

import { UserTypes } from "~/modules/user/domain/interface/user";
import { AdminCreationAttributes } from "~/modules/admin/infra/persistence/model/admin";
import { CustomerCreationAttributes } from "~/modules/customer/infra/persistence/model/customer";

export interface IUserStrategy<
  AttributesType extends EntityProps,
  EntityType extends Entity<AttributesType> = Entity<AttributesType>,
> {
  create(payload: AttributesType): Result<EntityType>;
}

export interface IUserStrategyFactory {
  createUser: (
    userType: UserTypes
  ) => IUserStrategy<AdminCreationAttributes | CustomerCreationAttributes>;
}
