import { sequelize } from '../config/database';
import { Customer } from '../models/Customer.model';
import { Dish } from '../models/Dish.model';
import { Order } from '../models/Order.model';

export async function runSeed() {
  try {
    await sequelize.sync({ force: true }); // CUIDADO: Isso recria todas as tabelas

    // Criar clientes
    const customers = await Customer.bulkCreate([
      { name: 'João Silva', cpf: '33621947027' },
      { name: 'Maria Souza', cpf: '46487252042' },
      { name: 'Carlos Oliveira', cpf: '57906840097' },
      { name: 'Ana Santos', cpf: '87560960030' },
      { name: 'Pedro Costa', cpf: '19068799070' },
      { name: 'Julia Fernandes', cpf: '43167505001' }
    ]);

    // Criar pratos
    const dishes = await Dish.bulkCreate([
      { name: 'Pizza Margherita', price: 45.90 },
      { name: 'Spaghetti Carbonara', price: 32.50 },
      { name: 'Salada Caesar', price: 25.00 },
      { name: 'Filé Mignon', price: 89.90 },
      { name: 'Sushi Variado', price: 65.00 },
      { name: 'Hambúrguer Artesanal', price: 28.00 }
    ]);

    // Criar pedidos (distribuídos para gerar dados interessantes nos relatórios)
    await Order.bulkCreate([
      // João Silva (muitos pedidos, alto valor)
      { customerId: customers[0].id, dishId: dishes[3].id, quantity: 2 }, // Filé Mignon
      { customerId: customers[0].id, dishId: dishes[4].id, quantity: 1 }, // Sushi
      { customerId: customers[0].id, dishId: dishes[3].id, quantity: 1 }, // Filé Mignon
      { customerId: customers[0].id, dishId: dishes[0].id, quantity: 3 }, // Pizza

      // Maria Souza (muitos pedidos, valor médio)
      { customerId: customers[1].id, dishId: dishes[1].id, quantity: 2 }, // Carbonara
      { customerId: customers[1].id, dishId: dishes[5].id, quantity: 4 }, // Hambúrguer
      { customerId: customers[1].id, dishId: dishes[2].id, quantity: 1 }, // Salada

      // Carlos Oliveira (poucos pedidos, alto valor)
      { customerId: customers[2].id, dishId: dishes[3].id, quantity: 3 }, // Filé Mignon
      { customerId: customers[2].id, dishId: dishes[4].id, quantity: 2 }, // Sushi

      // Ana Santos (pedidos médios)
      { customerId: customers[3].id, dishId: dishes[0].id, quantity: 2 }, // Pizza
      { customerId: customers[3].id, dishId: dishes[1].id, quantity: 1 }, // Carbonara

      // Pedro Costa (poucos pedidos)
      { customerId: customers[4].id, dishId: dishes[5].id, quantity: 1 }, // Hambúrguer

      // Julia Fernandes (nenhum pedido - não deve aparecer nos relatórios)
    ]);

    console.log('Seed mock completed!');
  } catch (error) {
    console.error(error);
  }
}

runSeed();