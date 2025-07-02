import { Order } from '../models/Order.model';

export class OrderService {
  async createOrder(customerId: string, dishId: string, quantity: number) {
    return await Order.create({ customerId, dishId, quantity });
  }

  async getAllOrders() {
    return await Order.findAll({
      include: ['customer', 'dish']
    });
  }

  async getOrderById(id: string) {
    return await Order.findByPk(id, {
      include: ['customer', 'dish']
    });
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
