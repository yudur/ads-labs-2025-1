import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

const orderService = new OrderService();

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const { customerId, dishId, quantity } = req.body;
      const order = await orderService.createOrder(customerId, dishId, quantity);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  }

  async getById(req: Request, res: Response) {
    const order = await orderService.getOrderById(req.params.id);
    if (order) res.json(order);
    else res.status(404).json({ error: 'Order not found' });
  }

  async update(req: Request, res: Response) {
    const order = await orderService.updateOrder(req.params.id, req.body);
    if (order) res.json(order);
    else res.status(404).json({ error: 'Order not found' });
  }

  async delete(req: Request, res: Response) {
    const result = await orderService.deleteOrder(req.params.id);
    if (result) res.json({ message: 'Order deleted successfully' });
    else res.status(404).json({ error: 'Order not found' });
  }
}
