import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuid } from 'uuid';

export class Customer extends Model {
  public id!: string;
  public name!: string;
  public cpf!: string;
}

Customer.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuid(),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(11),
    unique: true,
    allowNull: false,
    validate: {
      is: /^\d{11}$/,
      len: [11, 11]
    }
  }
}, {
  sequelize,
  tableName: 'customers',
  timestamps: true
});
