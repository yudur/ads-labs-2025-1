import { Injectable } from "@angular/core";
import { env } from "../../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { CustomerDTO } from "../../DTOs/customer.dto";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CustomerService {
    private readonly baseUrl = `${env.apiUrl}/customers`
    constructor(private http: HttpClient) {}

    getAll(): Observable<CustomerDTO[]> {
        return this.http.get<CustomerDTO[]>(this.baseUrl);
    }

    getById(id: string): Observable<CustomerDTO> {
        return this.http.get<CustomerDTO>(`${this.baseUrl}/${id}`);
    }

    create(CustomerDTO: Partial<CustomerDTO>): Observable<CustomerDTO> {
        return this.http.post<CustomerDTO>(this.baseUrl, CustomerDTO);
    }

    update(id: string, CustomerDTO: Partial<CustomerDTO>): Observable<CustomerDTO> {
        return this.http.put<CustomerDTO>(`${this.baseUrl}/${id}`, CustomerDTO);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}