import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { orderSchema } from '../schemas/order.schema';

const orderService = new OrderService();

export class OrderController {
  async create(req: Request, res: Response): Promise<any> {
    try {
      const parsed = orderSchema.parse(req.body);
      const order = await orderService.createOrder(parsed.customerId, parsed.dishId, parsed.quantity);
      res.status(201).json(order);
    } catch (error: any) {
      return res.status(400).json({ error: error?.errors?.[0]?.message || error.message });
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

  async update(req: Request, res: Response): Promise<any> {
    try {
      const parsed = orderSchema.partial().parse(req.body);
      const order = await orderService.updateOrder(req.params.id, parsed);
      if (order) res.json(order);
      else res.status(404).json({ error: 'Order not found' });
    } catch (error: any) {
      return res.status(400).json({ error: error?.errors?.[0]?.message || error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const result = await orderService.deleteOrder(req.params.id);
    if (result) res.json({ message: 'Order deleted successfully' });
    else res.status(404).json({ error: 'Order not found' });
  }
}
