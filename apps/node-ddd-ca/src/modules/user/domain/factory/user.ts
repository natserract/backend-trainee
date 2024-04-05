import { Entity, EntityProps, Result } from "types-ddd";

import { Admin } from "~/modules/admin/domain/entity/admin";
import { Customer } from "~/modules/customer/domain/entity/customer";
import { AdminCreationAttributes } from "~/modules/admin/infra/persistence/model/admin";
import { CustomerCreationAttributes } from "~/modules/customer/infra/persistence/model/customer";
import { UserTypes } from "~/modules/user/domain/interface/user";

interface UserStrategy<
  AttributesType extends EntityProps,
  EntityType extends Entity<AttributesType> = Entity<AttributesType>,
> {
  create(payload: AttributesType): Result<EntityType>;
}

class CustomerStrategy implements UserStrategy<CustomerCreationAttributes> {
  create(payload: CustomerCreationAttributes) {
    return Customer.create(payload);
  }
}

class AdminStrategy implements UserStrategy<AdminCreationAttributes> {
  create(payload: AdminCreationAttributes) {
    return Admin.create(payload);
  }
}

export class UserStrategyFactory {
  public static create(
    userType: UserTypes
  ): UserStrategy<AdminCreationAttributes | CustomerCreationAttributes> {
    switch (userType) {
      case UserTypes.ADMIN:
        return new AdminStrategy();
      default:
        return new CustomerStrategy();
    }
  }
}
