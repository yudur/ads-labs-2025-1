import { Customer } from './Customer.model';
import { Dish } from './Dish.model';
import { Order } from './Order.model';

export function setupAssociations() {
  Customer.hasMany(Order, { foreignKey: 'customerId', as: 'orders' });
  Order.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

  Dish.hasMany(Order, { foreignKey: 'dishId', as: 'orders' });
  Order.belongsTo(Dish, { foreignKey: 'dishId', as: 'dish' });
}
