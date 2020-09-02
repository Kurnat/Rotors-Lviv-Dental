import { CategoryService } from 'src/app/shared/services/category.service';
import { IIsNewCategory } from '../../shared/interfaces';
import { DialogCategoryComponent } from './../components/dialog-category/dialog-category.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogProductFormComponent } from '../components/dialog-product-form/dialog-product-form.component';
import { DialogConfirmDataComponent } from '../components/dialog-confirm-data/dialog-confirm-data.component';
import { CommonDialogServiceService } from '../services/open-dialog.service';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CreateNewCategoryService } from '../services/create-new-category.service';
// import { CommunicateComponentsService } from 'src/app/shared/services/communicate-components.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  private products$: Subscription;
  private categories$: Subscription;
  private orders$: Subscription;

  private router$: Subscription;
  public opend = false; // checker for side-nav to check is open or closse
  public adminRoute = '/admin/products';

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private createNewCategoryService: CreateNewCategoryService,
    public dialog: MatDialog,
  ) {
    this.router$ = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/admin/products') {
          this.adminRoute = '/admin/products';
        } else if (this.router.url === '/admin/categories') {
          this.adminRoute = '/admin/categories';
        } else if (this.router.url === '/admin/orders') {
          this.adminRoute = '/admin/orders';
        }
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.router$.unsubscribe();

    if (this.categories$) {
    this.categories$.unsubscribe();
    }
  }

  public openProductDialog(): void {
    // Open dialog for crateing new product
    this.dialog.open(DialogProductFormComponent, {
      width: '850px',
      data: {
        isNewProduct: 'isNewProduct',
        product: {
          producer: '',
          model: '',
          material: '',
          price: '',
          size: '',
          date: '',
          categories: '',
          ourSeriusNumber: '',
          seriusNumber: '',
          img: '',
        },
      },
    });
  }

  public openCategoriesDialog(): void {
    this.categories$ = this.dialog
      .open(DialogCategoryComponent, {
        data: {
          isNewCategory: true,
          category: {
            ua: '',
            en: '',
          }}
      })
      .afterClosed()
      .subscribe((result: IIsNewCategory) => {
        console.log(result);

        if (result && result.isNew) {
          console.log(result);

          // this.createNewCategoryService.change(result.category);
        }
      });
  }
}
