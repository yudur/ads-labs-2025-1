import { Request, Response } from 'express';
import { DishService } from '../services/dish.service';
import { dishSchema } from '../schemas/dish.schema';

const dishService = new DishService();

export class DishController {
  async create(req: Request, res: Response): Promise<any> {
    try {
      const parsed = dishSchema.parse(req.body);
      const dish = await dishService.createDish(parsed.name, parsed.price);
      res.status(201).json(dish);
    } catch (error: any) {
      return res.status(400).json({ error: error?.errors?.[0]?.message || error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const dishes = await dishService.getAllDishes();
    res.json(dishes);
  }

  async getById(req: Request, res: Response) {
    const dish = await dishService.getDishById(req.params.id);
    if (dish) res.json(dish);
    else res.status(404).json({ error: 'Dish not found' });
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const parsed = dishSchema.partial().parse(req.body);
      const dish = await dishService.updateDish(req.params.id, parsed);
      if (dish) res.json(dish);
      else res.status(404).json({ error: 'Dish not found' });
    } catch (error: any) {
      return res.status(400).json({ error: error?.errors?.[0]?.message || error.message });
    }
  }

  async delete(req: Request, res: Response) {
    const result = await dishService.deleteDish(req.params.id);
    if (result) res.json({ message: 'Dish deleted successfully' });
    else res.status(404).json({ error: 'Dish not found' });
  }
}
