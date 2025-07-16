import { sequelize } from '../config/database';

export class ReportService {
  async getDishesByOrderCount(): Promise<any[]> {
    const [results] = await sequelize.query(`
      SELECT
        dishes.id,
        dishes.name,
        SUM(orders.quantity) AS order_count
      FROM dishes
      JOIN orders ON dishes.id = orders."dishId"
      GROUP BY dishes.id
      ORDER BY order_count DESC
    `);
    return results;
  }

  async getTopCustomersByOrderCount(): Promise<any[]> {
    const [results] = await sequelize.query(`
      SELECT
        customers.id,
        customers.name,
        COUNT(orders.id) AS order_count
      FROM customers
      JOIN orders ON customers.id = orders."customerId"
      GROUP BY customers.id
      ORDER BY order_count DESC
      LIMIT 5
    `);
    return results;
  }

  async getTopCustomersBySpending(): Promise<any[]> {
    const [results] = await sequelize.query(`
      SELECT
        customers.id,
        customers.name,
        SUM(orders.quantity * dishes.price) AS total_spent
      FROM customers
      JOIN orders ON customers.id = orders."customerId"
      JOIN dishes ON orders."dishId" = dishes.id
      GROUP BY customers.id
      ORDER BY total_spent DESC
      LIMIT 5
    `);
    return results;
  }
}
