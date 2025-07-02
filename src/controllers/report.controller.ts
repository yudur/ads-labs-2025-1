import { Request, Response } from 'express';
import { ReportService } from '../services/report.service';

const reportService = new ReportService();

export class ReportController {
  async getDishesByOrderCount(req: Request, res: Response): Promise<void> {
    try {
      const dishes = await reportService.getDishesByOrderCount();
      res.json(dishes);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to get dishes report'
      });
    }
  }

  async getTopCustomersByOrderCount(req: Request, res: Response): Promise<void> {
    try {
      const customers = await reportService.getTopCustomersByOrderCount();
      res.json(customers);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to get top customers by orders'
      });
    }
  }

  async getTopCustomersBySpending(req: Request, res: Response): Promise<void> {
    try {
      const customers = await reportService.getTopCustomersBySpending();
      res.json(customers);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to get top customers by spending'
      });
    }
  }
}