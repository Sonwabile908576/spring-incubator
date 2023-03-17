import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { CustomerPage } from 'src/app/models/CustomerPage';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://localhost:8201/customers';

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<HttpResponse<Customer[]>>{
    return this.http.get<Customer[]>(this.url, { observe: 'response' });
  }

  registerCustomer(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.http.post<Customer>(this.url, customer, { observe: 'response' })
  }

  getCustomerById(id: Number): Observable<HttpResponse<Customer>> {
    return this.http.get<Customer>(`${this.url}/${id}`, { observe: 'response' });
  }
}
