import { Dish } from '../models/Dish.model';

export class DishService {
  async createDish(name: string, price: number) {
    return await Dish.create({ name, price });
  }

  async getAllDishes() {
    return await Dish.findAll();
  }

  async getDishById(id: string) {
    return await Dish.findByPk(id);
  }

  async updateDish(id: string, updates: Partial<Dish>) {
    const dish = await Dish.findByPk(id);
    if (!dish) return null;
    return await dish.update(updates);
  }

  async deleteDish(id: string) {
    const dish = await Dish.findByPk(id);
    if (!dish) return null;
    await dish.destroy();
    return true;
  }
}
