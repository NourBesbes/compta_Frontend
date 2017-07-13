import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User,Company } from '../_models/index';
import { CompanyService,AuthenticationService } from '../_services/index';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
currentUser: User;
  companies: Company[] = [];
  constructor(private router:Router,private authService: AuthenticationService, private compService:CompanyService)
  {  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}

  logOut()
  {this.authService.logout();
  this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.getallCompanies();
    console.log(this.companies);
  }



  getallCompanies(){
    this.compService.getall().subscribe(data => { this.companies = data;
      });
  }
  deleteCompani(id:string){
    this.compService.deleteCompany(id).subscribe(data => { this.companies = data;
      this.companies=[];
    this.getallCompanies();});
  }
}
