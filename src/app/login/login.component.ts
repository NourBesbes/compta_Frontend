import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
   // moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(private localStorage: LocalStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {

        // reset login status
     //   this.authenticationService.logout();
if (localStorage.getItem("currentUser")) this.router.navigate(['/dashboard']);
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    login() {
        this.loading = true;

        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                  if (data.success==true) {
                    var store = JSON.parse(localStorage.getItem("currentUser"));
                    
                    if (data.role == "superAdmin") this.router.navigate(['admin']);
                    else this.router.navigate([this.returnUrl]);
                  }
                else
                  {this.alertService.error(data.msg);
                    this.loading = false;} },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

    }
}
