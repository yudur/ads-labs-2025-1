import { Request, Response } from 'express';
import { DishService } from '../services/dish.service';

const dishService = new DishService();

export class DishController {
  async create(req: Request, res: Response) {
    try {
      const { name, price } = req.body;
      const dish = await dishService.createDish(name, price);
      res.status(201).json(dish);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
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

  async update(req: Request, res: Response) {
    const dish = await dishService.updateDish(req.params.id, req.body);
    if (dish) res.json(dish);
    else res.status(404).json({ error: 'Dish not found' });
  }

  async delete(req: Request, res: Response) {
    const result = await dishService.deleteDish(req.params.id);
    if (result) res.json({ message: 'Dish deleted successfully' });
    else res.status(404).json({ error: 'Dish not found' });
  }
}
