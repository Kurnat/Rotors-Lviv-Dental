import { IProductResponse } from '../interfaces';
import { IProduct, IProductsResponse } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = '/api/v1/products/';

  constructor(private http: HttpClient) { }

  getProducts(queryParams: {} = {}): Observable<any>{
    const params = new HttpParams({ fromObject: queryParams });

    return this.http.get<IProductsResponse>(this.url, {params});
  }

  createProduct(newProduct: IProduct): Observable<any>{
    return this.http.post<IProductResponse>(this.url, newProduct);
  }

  getOneById(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  deleteOneById(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  updateOneById(id: string, product: IProduct): Observable<any> {
    return this.http.put(this.url + id, product);
  }
}
