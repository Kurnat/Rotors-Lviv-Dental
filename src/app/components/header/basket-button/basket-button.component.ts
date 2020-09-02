import { OrdersService } from 'src/app/shared/services/orders.service';
import { switchMap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { BasketComponent } from './../../basket/basket.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasketService } from 'src/app/shared/services/basket.service';
import { MatDialog } from '@angular/material/dialog';
import { IOrderRes } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-basket-button',
  templateUrl: './basket-button.component.html',
  styleUrls: ['./basket-button.component.scss']
})
export class BasketButtonComponent implements OnInit, OnDestroy {
  private basket$: Subscription;

  public shopBadge = 0;

  constructor(
            private basketService: BasketService,
            private dialog: MatDialog,
            private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.checkBasket();
    this.refreshBasket();
  }

  ngOnDestroy(): void {
    if (this.basket$) {
      this.basket$.unsubscribe();
    }
  }

  private refreshBasket(): any {
    const products: IOrderRes[] = this.basketService.orders;
    // Set number of products to "matBadge" of "shop_icon"
    if (products && products.length) {
      this.shopBadge = this.basketService.sumOfProducts();
    } else {
      this.shopBadge = 0;
    }
  }

  private checkBasket(): void {
    // listen of button of "Придбати" ("Buy")
    this.basket$ = this.basketService.bascket.subscribe((data) => {
      this.shopBadge = this.basketService.sumOfProducts();

    });
  }

  public openBasketModal(): void {
    this.dialog.open(BasketComponent, {width: '650px'}).afterClosed()
      .pipe(
        switchMap(result =>
          result ? this.ordersService.create(result) : of(null)
        )
      )
      .subscribe(result => {
        console.log(result);
      }
      );
  }
}
