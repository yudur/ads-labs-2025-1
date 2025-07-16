import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuid } from 'uuid';

export class Order extends Model {
  public id!: string;
  public customerId!: string;
  public dishId!: string;
  public quantity!: number;
}

Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuid(),
    primaryKey: true
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  dishId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  sequelize,
  tableName: 'orders',
  timestamps: true
});
