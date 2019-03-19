import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements  CanActivate {

  constructor(private nav: NavController) {

  }
  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = window.localStorage.getItem('token');
    if (token == null || token === undefined) {
      this.nav.navigateForward('login');
      return false;
    }
    return true;
  }

}
