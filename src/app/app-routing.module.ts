import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabls', pathMatch: 'full' },
  { path: 'tabls', loadChildren: './tabls/tabls.module#TablsPageModule' },
  { path: 'classify', loadChildren: './classify/classify.module#ClassifyPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'classify', loadChildren: './classify/classify/classify.module#ClassifyPageModule' },
  { path: 'cart', loadChildren: './cart/cart/cart.module#CartPageModule' },
  { path: 'mine', loadChildren: './mine/mine/mine.module#MinePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
