import { IResOrders, IOrder, IUserOrder } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private url = '/api/v1/orders/';
  constructor(private http: HttpClient) { }

  public getAll(): Observable<IResOrders> {
    return this.http.get<IResOrders>(this.url);
  }

  public create(userOrder: IResOrders): Observable<IResOrders> {
    return this.http.post<IResOrders>(this.url, userOrder);
  }

  public delete(id: string = ''): Observable<IResOrders> {
    return this.http.delete<IResOrders>(this.url + id);
  }

  public update(order: IUserOrder): Observable<IResOrders> {
    const id = order._id;
    console.log(order);

    delete order._id;

    return this.http.put<IResOrders>(this.url + id, order);
  }

}
