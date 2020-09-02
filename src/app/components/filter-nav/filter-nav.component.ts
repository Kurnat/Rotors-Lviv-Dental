import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';
import { ICategory, IProduct } from '../../shared/interfaces';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ICategoryResponse, IProductsResponse } from 'src/app/shared/interfaces';


@Component({
  selector: 'app-filter-nav',
  templateUrl: './filter-nav.component.html',
  styleUrls: ['./filter-nav.component.scss']
})
export class FilterNavComponent implements OnInit {
  public category$: Subscription;
  public categories: ICategory[];
  @Output() filterEmit = new EventEmitter<IProduct[]>();

  constructor(
        private categoryService: CategoryService,
        private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories(): void {
    this.category$ = this.categoryService.getAllCategories()
        .subscribe((res: ICategoryResponse) =>  {
          this.categories = res.data;
        });
  }

  public getProductsByCategory(event: Event, category: string): void {

    const queryParams = {categories: category};
    this.productService.getProducts(queryParams).subscribe( (res: IProductsResponse) => {

      this.filterEmit.emit(res.data);
    });
  }

  public getAllProducts(): void {
    this.productService.getProducts().subscribe( (res: IProductsResponse) => {

      this.filterEmit.emit(res.data);
    });
  }

}
