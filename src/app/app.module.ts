import { IntereptorService } from './shared/intereptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxGlideModule } from 'ngx-glide';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './pages/products/products.component';
import { CardComponent } from './components/card/card.component';
import { FilterNavComponent } from './components/filter-nav/filter-nav.component';
import { MaterialModule } from './shared/material.module';
import { ProductComponent } from './pages/product/product.component';
import { CaroselComponent } from './components/carosel/carosel.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminLoginPageComponent } from './admin/admin-login-page/admin-login-page.component';
import { ClientComponent } from './components/client/client.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { DialogConfirmDataComponent } from './admin/components/dialog-confirm-data/dialog-confirm-data.component';
import { DialogConfirmSolutionComponent } from './components/popups/dialog-confirm-solution/dialog-confirm-solution.component';
import { SnackMessageComponent } from './components/snack-bars/snack-message/snack-message.component';
import { AdminTableComponent } from './admin/components/admin-table/admin-table.component';
import { DialogProductFormComponent } from './admin/components/dialog-product-form/dialog-product-form.component';
import { UsersOrdersComponent } from './admin/components/users-orders/users-orders.component';
import { DialogImagesComponent } from './admin/components/dialog-images/dialog-images.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { AdminCategoriesTableComponent } from './admin/components/admin-categories-table/admin-categories-table.component';
import { AdminOrdersTableComponent } from './admin/components/admin-orders-table/admin-orders-table.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { DialogCategoryComponent } from './admin/components/dialog-category/dialog-category.component';
import { BasketButtonComponent } from './components/header/basket-button/basket-button.component';
import { BasketComponent } from './components/basket/basket.component';
import { DialogBasketComponent } from './admin/components/dialog-basket/dialog-basket.component';
import { DialogProductsCheckComponent } from './admin/components/dialog-products-check/dialog-products-check.component';
import { AdminProducersTableComponent } from './admin/components/admin-producers-table/admin-producers-table.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    CardComponent,
    FilterNavComponent,
    ProductComponent,
    CaroselComponent,
    CategoriesComponent,
    HomeComponent,
    AdminLoginPageComponent,
    ClientComponent,
    AdminPageComponent,
    DialogProductFormComponent,
    DialogConfirmDataComponent,
    DialogConfirmSolutionComponent,
    SnackMessageComponent,
    AdminTableComponent,
    UsersOrdersComponent,
    DialogImagesComponent,
    LoaderComponent,
    AdminCategoriesTableComponent,
    AdminOrdersTableComponent,
    ProgressBarComponent,
    DialogCategoryComponent,
    BasketButtonComponent,
    BasketComponent,
    DialogBasketComponent,
    DialogProductsCheckComponent,
    AdminProducersTableComponent,
  ],
  // Modal windows
  entryComponents: [
    DialogProductFormComponent,
    DialogConfirmDataComponent,
    DialogConfirmSolutionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGlideModule,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: IntereptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
