import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ElementRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { DialogConfirmSolutionComponent } from 'src/app/components/popups/dialog-confirm-solution/dialog-confirm-solution.component';
import { BasketComponent } from 'src/app/components/basket/basket.component';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IResOrders, IUserOrder, IOrderRes, IProduct } from 'src/app/shared/interfaces';
import { isIProductChecker, isIOrderReschecker } from '../../../shared/utils/interface-checker';

@Component({
  selector: 'app-admin-orders-table',
  templateUrl: './admin-orders-table.component.html',
  styleUrls: ['./admin-orders-table.component.scss'],
})
export class AdminOrdersTableComponent implements OnInit {
  orders: IUserOrder[];
  loader = false;

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initTable();
  }

  initTable(): void {
    this.ordersService.getAll().subscribe((data: IResOrders) => {
      console.log(data.orders);
      data.orders.map(o => {                  // Chek if object has IProduct interface or it is id (string)
        o.sum = o.products.reduce((acc, i) => (isIProductChecker(i.product) ? (acc += i.count * i.product.price) : 0), 0);
      });

      this.orders = data.orders;
    });
  }

  openDeledeDialog(event: ElementRef, order: IUserOrder): void {
    console.log(event);

    const dialogOptions = {
      width: '360px',
      data: { name: order.orderNumber, type: 'замовлення' },
    };
    this.dialog
      .open(DialogConfirmSolutionComponent, dialogOptions)
      .afterClosed()
      .pipe(
        switchMap((result: boolean) => {
          if (result && result === true) {
            this.loader = true;
            return this.ordersService.delete(order._id);
          } else {
            return of(null);
          }
        }
      ))
      .subscribe(
        (response: IResOrders) => {
          if (response && response.success) {
            this.loader = false;
            this.showSnackMessage(`Замовлення було успішно видаленно`, 4000);

            // delete order from array
            const idx = this.orders.findIndex(ord => ord._id === order._id);
            this.orders.splice(idx, 1);
          }
        },
        () => this.loader = false
      );
  }

  openEditDialog(element: IUserOrder): void {
    console.log(element);

    this.dialog.open(BasketComponent, { data: element, width: '650px' }).afterClosed()
    .pipe(switchMap((result: IOrderRes | boolean) => {
      if (result && isIOrderReschecker(result)) {
        const idx = this.orders.findIndex(ord => ord._id === (result.product as IProduct)._id);
        this.orders.splice(idx, 1);

        return this.ordersService.delete((result.product as IProduct)._id);
      } else {
        return of(null);
      }
    }))
      .subscribe((response: IResOrders) => {
        if (response) {
          this.showSnackMessage('Замовлення було успішно видалено', 4000);
      }});
  }


  // MatSnackBar
  private showSnackMessage(message: string, millisec: number): void {
    this.snackBar.open(message, null, {
      duration: millisec,
    });
  }
}
