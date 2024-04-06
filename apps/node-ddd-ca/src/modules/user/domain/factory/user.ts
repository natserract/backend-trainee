import { Result } from "types-ddd";

import { Admin } from "~/modules/admin/domain/entity/admin";
import { Customer } from "~/modules/customer/domain/entity/customer";
import { AdminCreationAttributes } from "~/modules/admin/infra/persistence/model/admin";
import { CustomerCreationAttributes } from "~/modules/customer/infra/persistence/model/customer";
import { UserCreationAttributes } from "~/modules/user/infra/persistence/model/user";
import { UserTypes } from "~/modules/user/domain/interface/user";
import {
  IUserStrategy,
  IUserStrategyFactory,
} from "~/modules/user/domain/interface/factory";
import { User } from "~/modules/user/domain/entity/user";

class CustomerStrategy {
  create(
    payload: Omit<CustomerCreationAttributes, "userId"> & UserCreationAttributes
  ): Result<User | Customer> {
    const user = User.create({
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
    });

    const customer = Customer.create({
      ...payload,
      userId: user.value().id.value(),
      name: payload.name,
      notes: payload.notes,
    });

    if (user.isFail() || customer.isFail()) return Result.fail();

    return Object.assign(user, customer);
  }
}

class AdminStrategy {
  create(
    payload: Omit<AdminCreationAttributes, "userId"> & UserCreationAttributes
  ): Result<Admin | Customer> {
    const user = User.create({
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
    });

    const admin = Admin.create({
      ...payload,
      userId: user.value().id.value(),
    });

    if (user.isFail() || admin.isFail()) return Result.fail();

    return Object.assign(user, admin);
  }
}

export class UserStrategyFactory {
  public static build<U extends UserTypes>(userType: U) {
    switch (userType) {
      case UserTypes.ADMIN:
        return new AdminStrategy();
      default:
        return new CustomerStrategy();
    }
  }
}
