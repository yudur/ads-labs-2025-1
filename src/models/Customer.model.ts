import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuid } from 'uuid';

export class Customer extends Model {
  public id!: number;
  public cpf!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
      primaryKey: true
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
      validate: {
        is: /^\d{11}$/,
        len: [11, 11]
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    sequelize,
    tableName: 'customers',
    timestamps: true
  }
);