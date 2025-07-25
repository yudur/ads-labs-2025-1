import { Injectable } from "@angular/core";
import { env } from "../../../../environments/environments";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ReportService {
    private readonly baseUrl = `${env.apiUrl}/report`
    constructor(private http: HttpClient) {}

    getDishesByOrderCount() {
        return this.http.get(`${this.baseUrl}/dishes-by-orders`);
    }

    getTopCustomersByOrderCount() {
        return this.http.get(`${this.baseUrl}/top-customers-orders`);
    }

    getTopCustomersBySpending() {
        return this.http.get(`${this.baseUrl}/top-customers-spending`);
    }
}