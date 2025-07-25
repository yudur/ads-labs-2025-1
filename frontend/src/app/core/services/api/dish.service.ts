import { HttpClient } from "@angular/common/http";
import { env } from "../../../../environments/environments";
import { Injectable } from "@angular/core";
import { createDishDTO } from "../../DTOs/dish.dto";

@Injectable({ providedIn: 'root' })
export class DishService {
    private readonly baseUrl = `${env.apiUrl}/dishes`;
    
    constructor(private http: HttpClient) {}

    getDishes() {
        return this.http.get(`${this.baseUrl}`);
    }

    getDishById(id: string) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createDish(dish: createDishDTO) {
        return this.http.post(`${this.baseUrl}`, dish);
    }

    updateDish(id: string, dish: createDishDTO) {
        return this.http.put(`${this.baseUrl}/${id}`, dish);
    }

    deleteDish(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}