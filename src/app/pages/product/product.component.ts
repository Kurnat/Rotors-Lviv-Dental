import { Product } from 'src/app/shared/classes/Product';
import { BasketService } from './../../shared/services/basket.service';
import { IProduct, IProductResponse, IOrderRes } from 'src/app/shared/interfaces';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  routerSub: Subscription;
  productSub: Subscription;

  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.routerSub = this.route.params.subscribe((params) => {
      if (params.id) {
        this.productSub = this.productService.getOneById(params.id).subscribe((data: IProductResponse) => {
          this.product = data.data;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  public addToBasket(product: IProduct): void {
    this.basketService.addProduct({product: new Product(product), count: 1}).bascket.next();
  }
}
