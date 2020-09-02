import { Subscription } from 'rxjs';
import { IProduct } from '../../../shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { IProductsResponse } from 'src/app/shared/interfaces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-products-check',
  templateUrl: './dialog-products-check.component.html',
  styleUrls: ['./dialog-products-check.component.scss']
})
export class DialogProductsCheckComponent implements OnInit, OnDestroy {
  private productSub$: Subscription;

  public products: IProduct[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private productService: ProductService
  ) { }


  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productSub$) {
      this.productSub$.unsubscribe();
    }
  }

  private getProducts(): void {
    this.productSub$ = this.productService.getProducts()
          .subscribe((result: IProductsResponse) => this.products = result.data);
  }
}
