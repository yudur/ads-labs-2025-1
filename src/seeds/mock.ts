import { sequelize } from '../config/database';
import { Customer } from '../models/Customer.model';
import { Dish } from '../models/Dish.model';
import { Order } from '../models/Order.model';

async function seed() {
  await sequelize.sync({ force: true });

  const customers = await Customer.bulkCreate([
    { name: 'João Silva', cpf: '12345678901' },
    { name: 'Maria Oliveira', cpf: '98765432100' },
    { name: 'Carlos Souza', cpf: '11122233344' },
    { name: 'Ana Pereira', cpf: '55566677788' },
    { name: 'Lucas Lima', cpf: '99988877766' },
  ]);

  const dishes = await Dish.bulkCreate([
    { name: 'Spaghetti', price: 29.9 },
    { name: 'Lasanha', price: 39.9 },
    { name: 'Risoto', price: 49.5 },
  ]);

  await Order.bulkCreate([
    { customerId: customers[0].id, dishId: dishes[0].id, quantity: 3 },
    { customerId: customers[1].id, dishId: dishes[1].id, quantity: 2 },
    { customerId: customers[1].id, dishId: dishes[2].id, quantity: 1 },
    { customerId: customers[2].id, dishId: dishes[0].id, quantity: 4 },
    { customerId: customers[3].id, dishId: dishes[2].id, quantity: 5 },
    { customerId: customers[4].id, dishId: dishes[1].id, quantity: 1 },
    { customerId: customers[4].id, dishId: dishes[2].id, quantity: 2 },
  ]);

  console.log('✅ Seed executed successfully');
  process.exit();
}

seed();
