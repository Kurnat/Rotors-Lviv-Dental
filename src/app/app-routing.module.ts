import { AdminCategoriesTableComponent } from './admin/components/admin-categories-table/admin-categories-table.component';

import { AdminTableComponent } from './admin/components/admin-table/admin-table.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { ClientComponent } from './components/client/client.component';
import { AdminLoginPageComponent } from './admin/admin-login-page/admin-login-page.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './shared/guards/admin-auth.guard';
import { AdminOrdersTableComponent } from './admin/components/admin-orders-table/admin-orders-table.component';
import { AdminProducersTableComponent } from './admin/components/admin-producers-table/admin-producers-table.component';


const routes: Routes = [
  {path: '', component: ClientComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'product/:id', component: ProductComponent}
  ]},
  {path: 'admin', component: AdminPageComponent, children: [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: 'products', component: AdminTableComponent},
    {path: 'categories', component: AdminCategoriesTableComponent},
    {path: 'producers', component: AdminProducersTableComponent},
    {path: 'orders', component: AdminOrdersTableComponent}
  ]}, // , canActivate: [AdminAuthGuard]
  {path: 'admin-login', component: AdminLoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
