import { Customer } from "~/modules/customer/model/customer";
import { User } from "~/modules/user/application/model/user";

import { connection } from "~/shared/infra/db/config/config";

const sequelize = connection.sequelize;

export const models: Record<string, any> = {
  Customer,
  User,
};

export const initModels = async (withoutSync = false) => {
  // Create the relationships for the models;
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }

    // Create model associations
    if (
      "associate" in models[modelName].prototype &&
      !Object.keys(models[modelName].associations).length
    ) {
      models[modelName].prototype.associate(models);
    }
  });

  if (!withoutSync) {
    await sequelize.sync();
  }
};
