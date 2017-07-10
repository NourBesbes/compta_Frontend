import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
@Injectable()
export class AuthCompany implements CanActivate {

    constructor(private router: Router,private localStorage: LocalStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('currentCompany')) {
        // logged in so return true


        return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/registerC'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  



}
