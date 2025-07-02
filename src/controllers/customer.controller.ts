import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';
import { customerSchema } from '../schemas/customer.schema';

const customerService = new CustomerService();

export class CustomerController {
  async create(req: Request, res: Response): Promise<any> {
    try {
      const parsed = customerSchema.parse(req.body);
      const customer = await customerService.createCustomer(parsed.cpf, parsed.name);
      res.status(201).json(customer);
    } catch (error: any) {
      return res.status(400).json({ error: error?.errors?.[0]?.message || error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const customers = await customerService.getAllCustomers();
    res.json(customers);
  }

  async getById(req: Request, res: Response) {
    const customer = await customerService.getCustomerById(req.params.id);
    if (customer) res.json(customer);
    else res.status(404).json({ error: 'Customer not found' });
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const parsed = customerSchema.partial().parse(req.body);
      const customer = await customerService.updateCustomer(req.params.id, parsed);
      if (customer) res.json(customer);
      else res.status(404).json({ error: 'Customer not found' });
    } catch (error: any) {
      return res.status(400).json({ error: error?.errors?.[0]?.message || error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const result = await customerService.deleteCustomer(req.params.id);
    if (result) res.json({ message: 'Customer deleted successfully' });
    else res.status(404).json({ error: 'Customer not found' });
  }
}
