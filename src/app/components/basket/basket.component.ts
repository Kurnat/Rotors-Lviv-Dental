import { switchMap } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, of } from 'rxjs';

import { DialogProductsCheckComponent } from 'src/app/admin/components/dialog-products-check/dialog-products-check.component';
import { BasketService } from 'src/app/shared/services/basket.service';
import { IUserOrder, IProduct, IOrderRes } from '../../shared/interfaces';
import { DialogConfirmSolutionComponent } from '../popups/dialog-confirm-solution/dialog-confirm-solution.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {
  private dialogProdSub$: Subscription;

  public form: FormGroup;
  public orders: IOrderRes[];
  public totalPrice = 0;
  public result = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUserOrder,
    public dialogRef: MatDialogRef<BasketComponent>,
    private basketService: BasketService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.orders = this.data.products;
      this.countSumForEdit();
    } else {
      this.orders = this.basketService.orders;
      this.sumToalPrice();
    }

    this.initialForm();
  }

  ngOnDestroy(): void {
    if (this.dialogProdSub$){
      this.dialogProdSub$.unsubscribe();
    }
  }

  public initialForm(): void {
    this.form = this.fb.group({
      ['userName']: this.data?.userName || 'М',
      ['phone']: this.data?.phone || '+380636309711',
      ['email']: this.data?.email || 'beda21@ukr.net'
    });
  }

  public makeOrder() {
    if (this.data) {
      this.makeEditOrder();
    } else {
      this.makeNewOrder();
    }
  }

  private makeNewOrder(): void {
    const result = { ...this.form.value, products: this.orders };
    this.ordersService.create(result).subscribe(date =>
      this.snackBar.open('Ваше замовлення було відправлено', null, {duration: 5000}));
  }

  private makeEditOrder(): void {
    const result = {...this.data, ...this.form.value, products: this.orders};
    console.log({...this.data, ...this.form.value, products: this.orders});

    this.ordersService.update(result).subscribe(response => {
      this.snackBar.open(`Замовлення ${this.data.orderNumber} було успішно відредаговано.`, null, {duration: 5000});
    });
  }


  deleteProduct(order: IOrderRes): void {
    console.log(order);

    if (this.data) {
      this.deleteEditProductOrder(order);
    } else {
      this.deleteNewProductOrder(order);
    }
  }

  private deleteNewProductOrder(order: IOrderRes): void {
    this.basketService.deleteProduct(order);
    this.orders = this.basketService.orders;
  }

  private deleteEditProductOrder(order: IOrderRes): void {
    console.log(order);

    const dialogOptions = {
      width: '360px',
      data: { name: (order.product as IProduct)._id, type: `"${(order.product as IProduct).categoryUA}" з цього замовлення.` },
    };

    this.dialog.open(DialogConfirmSolutionComponent, dialogOptions)
      .afterClosed()
      .pipe(switchMap((result: boolean | undefined) => {
          const idx = this.orders.findIndex(item => (item.product as IProduct)._id === (order.product as IProduct)._id);
          const orderIdx = this.orders[idx];

          if (idx !== -1) {
            if (result) {
              if (this.orders.length <= 1) {
                this.dialogRef.close(orderIdx);
              }
              this.orders.splice(idx, 1);

              if (this.orders.length > 0) {
                return this.ordersService.update({...this.form.value, products: orderIdx, _id: this.data._id});
              } else {
                return this.ordersService.delete(this.data._id);
              }

            } else {
              return of(null);
            }
        }
      }))
      .subscribe(data => console.log(data));
  }



  plusProduct(order: IOrderRes){
    if (this.data) {
      this.plusEditProduct(order);
    } else {
      this.plusNewProduct(order);
    }
  }

  private plusNewProduct(order: IOrderRes) {
    this.basketService.plusProduct(order); // set value to localStorage
    this.sumToalPrice();
  }

  private plusEditProduct(order: IOrderRes) {
    const idx = this.orders.findIndex(item =>
      (item.product as IProduct)._id === (order.product as IProduct)._id);

    if (idx !== -1 && this.orders[idx].count < 1000) {
      this.orders[idx].count++;
    }
  }

  public minuseProduct(order: IOrderRes){
    if (this.data) {
      this.minusEditProduct(order);
    } else {
      this.minuseNewProduct(order);
    }
  }

  private minuseNewProduct(order: IOrderRes): void {
    this.basketService.minuseProduct(order); // set value to localStorage
    this.sumToalPrice();
  }

  private minusEditProduct(order: IOrderRes) {
    const idx = this.orders.findIndex(item =>
      (item.product as IProduct)._id === ( order.product as IProduct)._id);

    if (idx !== -1 && this.orders[idx].count > 1) {
      this.orders[idx].count--;
    }
  }


  addProduct(){
    this.dialogProdSub$ = this.dialog.open(DialogProductsCheckComponent, {data: {isActive: false}}).afterClosed()
      .subscribe((product: IProduct) => {
      if (product) {
        const idx = this.orders.findIndex(item => (item.product as IProduct)._id === product._id);

        if (idx === -1) {
          this.orders.unshift({product, count: 1});
        } else {
          this.orders[idx].count++;
        }
      }
      });
  }

  private sumToalPrice(): void {
    this.orders = this.basketService.orders;
    this.totalPrice =  this.orders ? this.orders.reduce((acc, item) => (acc += item.count * (item.product as IProduct).price), 0) : 0;
    this.basketService.bascket.next(); // emit change in header-button (basket)
  }

  private countSumForEdit(): void {
    this.totalPrice = this.orders.reduce((acc, item) => (acc += item.count * (item.product as IProduct).price), 0);
  }
}

