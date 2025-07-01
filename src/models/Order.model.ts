import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Customer } from './Customer.model';
import { Dish } from './Dish.model';
import { v4 as uuid } from 'uuid';

export class Order extends Model {
  public id!: number;
  public customerId!: number;
  public dishId!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
      primaryKey: true
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Customer,
        key: 'id'
      }
    },
    dishId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Dish,
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1
      }
    }
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true
  }
);

// Definindo as associações
Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(Customer, { foreignKey: 'customerId' });

Dish.hasMany(Order, { foreignKey: 'dishId' });
Order.belongsTo(Dish, { foreignKey: 'dishId' });