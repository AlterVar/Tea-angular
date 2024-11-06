import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../types/product.type";
import {OrderType} from "../../types/order.type";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea');
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`);
  }

  sendOrder(data: OrderType): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{success: boolean, message?: string}>('https://testologia.ru/order-tea', data);
  }
}

