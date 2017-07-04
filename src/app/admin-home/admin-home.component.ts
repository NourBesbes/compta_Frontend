import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/index';
import { UserService,AuthenticationService } from '../_services/index';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
currentUser: User;
  constructor(private router:Router,private authService: AuthenticationService) 
  {  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}
  
  logOut()
  {this.authService.logout();
  this.router.navigate(['/login']);
  }
  
  ngOnInit() {
  }
}
