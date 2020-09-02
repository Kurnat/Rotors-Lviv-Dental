import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditExistedProductService {

  private editProduct = new Subject();

  constructor() { }

  listenChanges(): Observable<any> {
    return this.editProduct;
  }

  changeProduct(data: any){
    this.editProduct.next(data);
  }
}
