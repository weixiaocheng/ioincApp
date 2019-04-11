import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabls', pathMatch: 'full' },
  { path: 'tabls', loadChildren: './tabls/tabls.module#TablsPageModule' },
  { path: 'login', loadChildren: './login/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './login/register/register.module#RegisterPageModule' },
  { path: 'forget', loadChildren: './login/forget/forget.module#ForgetPageModule' },
  { path: 'product', loadChildren: './product/product/product.module#ProductPageModule' },
  { path: 'sku-page', loadChildren: './product/sku-page/sku-page.module#SkuPagePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
