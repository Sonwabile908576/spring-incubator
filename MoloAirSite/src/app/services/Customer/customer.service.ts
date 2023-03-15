import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomerPage } from 'src/app/models/CustomerPage';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = '/customerAPI/customers';

  constructor(private http: HttpClient) { }

  // getAllCustomers: Observable<>{
  //   return this.http.get<CustomerPage>(this.url);
  // }
}
