import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateNewProductService {

  private createNewProduct = new Subject();

  constructor() { }

  listenChanges(): Observable<any> {
    return this.createNewProduct;
  }

  postDataChanges(data: any){
    this.createNewProduct.next(data);
  }
}
