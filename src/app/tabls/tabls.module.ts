import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TablsPage } from './tabls.page';

const routes: Routes = [
  {
    path: '',
    component: TablsPage,
    children: [
      {
        path: '',
        // loadChildren: '../home/home/home.module#HomePageModule',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'classify',
        children: [
          {
            path: '',
            loadChildren: '../classify/classify/classify.module#ClassifyPageModule'
          }
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: '../cart/cart/cart.module#CartPageModule'
          }
        ]
      },
      {
        path: 'mine',
        children: [
          {
            path: '',
            loadChildren: '../mine/mine/mine.module#MinePageModule'
          }
        ]
      }
    ],
  },
  {
    path: '',
    redirectTo: 'tabls/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TablsPage]
})
export class TablsPageModule {}
