import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct, IOrderRes } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  // Listen changes
  public bascket = new Subject();

  public get orders(): IOrderRes[] {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  }

  public set orders(orders: IOrderRes[]) {
    localStorage.setItem('products', JSON.stringify(orders));
  }

  public addProduct(order: IOrderRes): BasketService {
    const orders = [...this.orders];

    const idx = orders.findIndex((item) => (item.product as IProduct)._id === (order.product as IProduct)._id);

    if (idx !== -1) {
      orders[idx].count++;
    } else {
      orders.unshift(order);
    }

    this.orders = orders;
    return this;
  }

  public sumOfProducts(): number {
    // Return sum of All products
    return this.orders ? this.orders.reduce((acc, order) => (acc += order.count), 0) : 0;
  }

  public deleteProduct(order: IOrderRes): void {
    const orders = [...this.orders];
    const idx = orders.findIndex(item => (order.product as IProduct)._id === (item.product as IProduct)._id);
    if (idx !== -1) {
      orders.splice(idx, 1);
    }

    this.orders = orders;
    this.bascket.next();
  }

  public minuseProduct(order: IOrderRes): void {
    const orders = [...this.orders];
    const idx = orders.findIndex(item => (item.product as IProduct)._id === (order.product as IProduct)._id);
    if (idx !== -1 && orders[idx].count > 1) {
     orders[idx].count--;
    }
    this.orders = orders;
    this.bascket.next();
  }

  public plusProduct(order: IOrderRes): void {
    const orders = [...this.orders];
    const idx = orders.findIndex(item => (item.product as IProduct)._id === (order.product as IProduct)._id);

    if (idx !== -1 && orders[idx].count < 999) {
      orders[idx].count++;
    }

    this.orders = orders;
    this.bascket.next();

  }
}
