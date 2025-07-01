import { Order } from '../models/Order.model';

export class OrderService {
  async createOrder(customerId: number, dishId: number, quantity: number) {
    return await Order.create({ customerId, dishId, quantity });
  }

  async getAllOrders() {
    return await Order.findAll({ include: ['Customer', 'Dish'] });
  }

  async getOrderById(id: string) {
    return await Order.findByPk(id, { include: ['Customer', 'Dish'] });
  }

  async updateOrder(id: string, updates: Partial<Order>) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    return await order.update(updates);
  }

  async deleteOrder(id: string) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    await order.destroy();
    return true;
  }
}
