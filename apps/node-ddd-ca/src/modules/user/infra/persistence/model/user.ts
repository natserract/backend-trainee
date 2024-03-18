import { DataTypes, Model, Op } from "sequelize";

import { connection } from "~/shared/infra/db/config/config";
import { IUserAttributes } from "~/modules/user/domain/interface/user";

const sequelize = connection.sequelize;

export interface UserCreationAttributes extends Omit<IUserAttributes, "id"> {}

export interface UserUpdateAttributes
  extends Omit<UserCreationAttributes, "credentialUuid"> {}

export interface UserModel
  extends Model<IUserAttributes, UserCreationAttributes>,
    IUserAttributes {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const User = sequelize.define<UserModel>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    credentialUuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
        where: {
          deletedAt: { [Op.not]: null },
        },
      },
      {
        unique: true,
        fields: ["phone"],
        where: {
          deletedAt: { [Op.not]: null },
        },
      },
    ],
  },
);
