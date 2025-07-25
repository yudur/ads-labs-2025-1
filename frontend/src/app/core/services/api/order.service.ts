import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../../environments/environments';
import { OrderCreateDTO } from '../../DTOs/order.dto';

@Injectable({providedIn: 'root'})
export class OrderService {
    baseUrl = `${env.apiUrl}/orders`;

    constructor(private http: HttpClient) { }

    getOrders() {
        return this.http.get(this.baseUrl);
    }

    getOrderById(id: string) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createOrder(order: OrderCreateDTO) {
        return this.http.post(this.baseUrl, order);
    }

    updateOrder(id: string, order: { quantity: number }) {
        return this.http.put(`${this.baseUrl}/${id}`, order);
    }

    deleteOrder(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}