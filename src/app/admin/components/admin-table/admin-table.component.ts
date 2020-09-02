import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

import {IProduct, IProductResponse, IProductsResponse, IDialogOtion} from '../../../shared/interfaces';
import { Product } from 'src/app/shared/classes/Product';
import { ProductService } from './../../../shared/services/product.service';
import { DialogConfirmSolutionComponent } from 'src/app/components/popups/dialog-confirm-solution/dialog-confirm-solution.component';
import { DialogProductFormComponent } from '../dialog-product-form/dialog-product-form.component';
import { CreateNewProductService } from '../../services/create-new-product.service';
import { EditExistedProductService } from '../../services/edit-existed-product.service';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss'],
})
export class AdminTableComponent implements OnInit, OnDestroy {
  private diologDel$: Subscription;
  private diologCreate$: Subscription;
  private diologEdit$: Subscription;
  private initTable$: Subscription;
  private createProduct$: Subscription;

  public progressBar = false;
  public products: Array<IProduct>;
  public dataSource: MatTableDataSource<IProduct>;
  public displayedColumns: string[] = [
    'position',
    'producer',
    'model',
    'img',
    'material',
    'price',
    'size',
    'date',
    'categories',
    'ourSeriusNumber',
    'seriusNumber',
    'action',
  ];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private createNewProductService: CreateNewProductService,
    private editExistedProductService: EditExistedProductService,
    public productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.initialTable();
    this.onAddingProductListener(); // Listener of adding new product from DialogConfirmComponent
    this.editExistingProduct(); // Listener of edit existing product from DialogConfirmComponent
  }

  ngOnDestroy(): void {
    if (this.diologDel$) {
      this.diologDel$.unsubscribe();
    }

    if (this.diologCreate$) {
      this.diologCreate$.unsubscribe();
    }

    if (this.diologEdit$) {
      this.diologEdit$.unsubscribe();
    }

    if (this.initTable$) {
      this.initTable$.unsubscribe();
    }

    if (this.createProduct$) {
      this.createProduct$.unsubscribe();
    }
  }

  private initialTable(): void {
    this.productService
      .getProducts()
      .subscribe((dataProducts: IProductsResponse) => {
        // Get products from DB
        this.products = dataProducts.data; // Array of products
        this.dataSource = new MatTableDataSource(this.products); // Add products array to Material Table
        this.dataSource.sort = this.sort; // Add sorting to Material Table
      });
  }

  private onAddingProductListener() {
    this.createProduct$ = this.createNewProductService
      .listenChanges()
      .subscribe((data: IDialogOtion) => {
        if (data.data.isNewProduct === 'isNewProduct') {
          // Create new product
          console.log(data.data.product);

          this.createNewProduct(data.data.product);
        }
      });
  }

  private createNewProduct(product: IProduct): void {
    this.progressBar = true; // Activate progress Bar
    this.diologCreate$ = this.productService.createProduct(product).subscribe(
      (responseData: IProductResponse) => {
        //  New product was created in DB
        this.products.push(responseData.data); // Add new product to array
        this.initialTable(); // Refresh table
        this.progressBar = false; // Off progressbar

        // Show snack message about success
        this.showSnackMessage(
          `Продукт ${responseData.data.ourSeriusNumber} було успішно створенно.`,
          4000
        );
      },
      (err) => this.progressBar = false // Off progressbar
    );
  }

  private editExistingProduct(): void {
    this.diologEdit$ = this.editExistedProductService
      .listenChanges()
      .subscribe((product: IProduct) => {
        this.progressBar = true; // On progressbar
        console.log(product);

        const id = product._id;
        delete product._id;
        this.productService
          .updateOneById(id, product)
          .subscribe((response: IProductResponse) => {
            // Update products array
            const idx = this.products
              .map((el: IProduct) => el._id)
              .indexOf(product._id); // Find index of deleted product
            this.products.splice(idx, 1, product); // Delete the product from local array by index

            this.initialTable(); // Refresh table
            this.progressBar = false; // Off progressbar

            // Show snack message about success
            this.showSnackMessage(
              `Продукт ${product.ourSeriusNumber} був успішно відредаговано.`,
              5000
            );
          });
      });
  }

  public openDialogEdit(product: IProduct) {
    // Open edit dialog 'Edit Product'
    this.dialog.open(DialogProductFormComponent, {
      width: '850px',
      data: {
        product: new Product(product),
        isNewProduct: 'isEdit',
      },
    });
  }

  // Open Dialog modal for confirm delete product
  public openConfirmToDeledeDialog(product: IProduct): void {
    // Open dialog about delete
    const dialogOptions = {
      width: '360px',
      data: { name: product.ourSeriusNumber, type: 'модель' },
    };
    this.diologDel$ = this.dialog
      .open(DialogConfirmSolutionComponent, dialogOptions)
      .afterClosed()
      .pipe(
        switchMap((result: boolean | undefined) => {
          this.progressBar = true; // On progressbar

          if (!!result) {
            // delete button was confirmed to delete product
            return this.productService.deleteOneById(product._id);
          } else {
            return of(null); // return any steream for switchMap
          }
        }))
      .subscribe(
        (response: IProductResponse | null) => {
          // this is response from server about deleted product
          this.progressBar = false; // Off progressbar

          if (response) {
            // if response about delete is success
            const idx = this.products
              .map((el: IProduct) => el._id)
              .indexOf(product._id); // Find index of deleted product
            this.products.splice(idx, 1); // Delete the product from local array by index

            this.initialTable(); // Refresh table

            const message = `Продукт ${product.ourSeriusNumber} було успішно видалено.`;
            this.showSnackMessage(message, 5000); // Show snack message about success
          }},
        (err) => this.progressBar = false // Off progressbar
      );
  }

  // MatSnackBar
  private showSnackMessage(message: string, millisec: number): void {
    this.snackBar.open(message, null, {
      duration: millisec,
    });
  }

  // Filter for table
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Listen data from Confirm dialog if if dialog was confirmed
}
