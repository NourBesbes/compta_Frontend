import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {NotificationService, NotificationType, NotificationOptions} from '../lbd/services/notification.service';
import { UserService } from '../_services/index';
@Injectable()
export class AuthAdmin implements CanActivate {
  public currentUser:any;
  public user:any;


  constructor(private router: Router,private localStorage: LocalStorageService,
              private notificationService: NotificationService,
              private userService:UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

   // this.userService.getByUsername(this.currentUser.username).subscribe((data) => { this.user = data;
      if (this.currentUser.role=="admin") {
        // logged in so return true
        return true;
      }
    //});

    // not logged in so redirect to login page with the return url
    this.notificationService.notify(new NotificationOptions({
      message: 'Vous nêtes pas admin',
      icon: 'pe-7s-delete-user',
      type: NotificationType.Danger,
      from: 'top',
      align: 'right'
    }));
    return false;
  }
}
