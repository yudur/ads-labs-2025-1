import { Customer } from "../models/Customer.model";

export class CustomerService {
    async createCustomer(cpf: string, name: string) {
    return await Customer.create({ cpf, name });
  }

  async getAllCustomers() {
    return await Customer.findAll();
  }

  async getCustomerById(id: string) {
    return await Customer.findByPk(id);
  }

  async updateCustomer(id: string, updates: Partial<Customer>) {
    const customer = await Customer.findByPk(id);
    if (!customer) return null;
    
    return await customer.update(updates);
  }

  async deleteCustomer(id: string) {
    const customer = await Customer.findByPk(id);
    if (!customer) return null;
    
    await customer.destroy();
    return true;
  }
}