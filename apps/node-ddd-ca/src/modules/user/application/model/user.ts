import { z } from "zod";
import { DataTypes, Model, Op } from "sequelize";

import { connection } from "~/shared/infra/db/config/config";

const sequelize = connection.sequelize;

export const UserAttributesSchema = z.object({
  id: z.number(),
  credentialUuid: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().nullish(),
});

export interface UserAttributes extends z.infer<typeof UserAttributesSchema> {
  id: number;
  credentialUuid: string;
  email: string;
  phone?: string | null;
}

export interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}

export interface UserUpdateAttributes
  extends Omit<UserCreationAttributes, "credentialUuid"> {}

export interface UserModel
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
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
