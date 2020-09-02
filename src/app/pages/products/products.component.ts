import { IProduct, IProductsResponse } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/services/product.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;

  maxWidth576px = false;
  opend = false;

  products: IProduct[];

  constructor(
          private breakpointObserver: BreakpointObserver,
          private productService: ProductService
    ) {}

  ngOnInit(): void {
    this.brackPointInit();
    this.getAllProducts();
  }

  brackPointInit(): void {
    const breakpoint = this.breakpointObserver
      .observe('(max-width: 576px)')
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.maxWidth576px = false;
        } else {
          this.maxWidth576px = true;
          this.opend = false;
        }
      });
  }

  getAllProducts(): void {
    this.productService.getProducts().subscribe((response: IProductsResponse) => this.products = response.data);
  }

  updateProducts(products: IProduct[]) {
    this.products = products;
  }
}
