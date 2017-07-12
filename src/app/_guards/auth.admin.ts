import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {NotificationService, NotificationType, NotificationOptions} from '../lbd/services/notification.service';
@Injectable()
export class AuthAdmin implements CanActivate {
    constructor(private router: Router,private localStorage: LocalStorageService,private notificationService: NotificationService) { }
  public currentUser:any;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser.role=="admin") {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
      const type = Math.floor((Math.random() * 4) + 1);


        this.notificationService.notify(new NotificationOptions({
          message: 'Vous nêtes pas admin',
          icon: 'pe-7s-delete-user',
          type: <NotificationType>(type),
          from: 'top',
          align: 'right'
        }));
        return false;
    }



}
