import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransactionPaymentResponse } from '../Models/Transaction';
import { OrderDto } from '../Models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(protected http: HttpClient) {}


  getData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/items`);
  }

  // POST
  CheckOutOrder(payload: any): Observable<TransactionPaymentResponse> {
    return this.http.post<TransactionPaymentResponse>(`${environment.apiUrl}/Order/CheckoutOrder`, payload);
  }

  GetAllOrders(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${environment.apiUrl}/Order/GetAllOrders`);

  }

  GetAllOrdersNotPay(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${environment.apiUrl}/Order/GetAllOrdersNotPay`);

  }

}
