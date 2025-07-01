import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';

const customerService = new CustomerService();

export class CustomerController {
  async create(req: Request, res: Response) {
    try {
      const { cpf, name } = req.body;
      const customer = await customerService.createCustomer(cpf, name);
      res.status(201).json(customer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const customers = await customerService.getAllCustomers();
    res.json(customers);
  }

  async getById(req: Request, res: Response) {
    const customer = await customerService.getCustomerById(parseInt(req.params.id));
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  }

  async update(req: Request, res: Response) {
    const customer = await customerService.updateCustomer(
      parseInt(req.params.id),
      req.body
    );
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  }

  async delete(req: Request, res: Response) {
    const result = await customerService.deleteCustomer(parseInt(req.params.id));
    if (result) {
      res.json({ message: 'Customer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  }
}