import { IProduct } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { IUserOrder, IOrder } from '../../../shared/interfaces';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { BasketService } from 'src/app/shared/services/basket.service';
import { DialogProductsCheckComponent } from '../dialog-products-check/dialog-products-check.component';

@Component({
  selector: 'app-dialog-basket',
  templateUrl: './dialog-basket.component.html',
  styleUrls: ['./dialog-basket.component.scss'],
})
export class DialogBasketComponent implements OnInit, OnDestroy {
  private dialogProdSub$: Subscription;

  public form: FormGroup;
  public orders: IProduct[];
  totalPrice = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUserOrder,
    private basketService: BasketService,
    private productService: ProductService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.initialForm();
    this.sumToalPrice();
  }

  ngOnDestroy(): void {
    if (this.dialogProdSub$){
      this.dialogProdSub$.unsubscribe();
    }
  }



  public initialForm(): void {
    this.form = this.fb.group({
      ['userName']: this.data.userName,
      ['phone']: this.data.phone,
      ['email']: this.data.email
    });
  }

  makeOrder() {
    // this.data.sum = this.totalPrice;

  }

  deleteProduct(order: IUserOrder) {
    // const idx = this.data.products.findIndex(prod => prod._id === order._id);
    // this.data.products.splice(idx, 1);
    this.sumToalPrice();
  }

  plusProduct(order){
    if (order.count < 999) {
      order.count += 1;
      this.sumToalPrice();
    }
  }

  minuseProduct(order){
    if (order.count > 1) {
      order.count -= 1;
      this.sumToalPrice();
    }
  }

  addProduct(){
    this.dialogProdSub$ = this.dialog.open(DialogProductsCheckComponent, {data: {isActive: false}}).afterClosed()
      .subscribe((result: IOrder) => {
        // if (result) {
        //   const idx = this.data.products.findIndex(product => product._id === result._id);
        //   if (idx === -1) {
        //     this.data.products.unshift(result);
        //   }else {
        //     this.data.products[idx].count += 1;
        //   }
        //   this.sumToalPrice();
        // }
      });
  }

  private sumToalPrice(): void {
    // this.totalPrice =  this.data.products.reduce((acc, product) => (acc += product.count * product.price), 0);
  }
}
