import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabls', pathMatch: 'full' },
  { path: 'tabls', loadChildren: './tabls/tabls.module#TablsPageModule' },
  { path: 'login', loadChildren: './login/login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
