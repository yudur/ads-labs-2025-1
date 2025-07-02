import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuid } from 'uuid';

export class Dish extends Model {
  public id!: string;
  public name!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Dish.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        is: /^[a-zA-ZÀ-ÿ\s]{3,50}$/,
        len: [3, 50]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01
      }
    }
  },
  {
    sequelize,
    tableName: 'dishes',
    timestamps: true
  }
);