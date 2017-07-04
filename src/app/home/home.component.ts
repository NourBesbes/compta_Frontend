import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/index';
import { UserService,AuthenticationService } from '../_services/index';

@Component({
  //  moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService,private router:Router,private authService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
logOut()
 {this.authService.logout();
 this.router.navigate(['/login']);}

    ngOnInit() {
        this.loadAllUsers();
        if (!localStorage.getItem("currentUser")) this.router.navigate(['/login']);
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
