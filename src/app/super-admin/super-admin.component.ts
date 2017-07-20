import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User,Company } from '../_models/index';
import { CompanyService,AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
  currentUser: any;
  companies: Company[] = [];
  constructor(private router:Router,private authService: AuthenticationService, private compService:CompanyService)
  {  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));}
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
  viewCompani(id:string){
    this.currentUser.company=id;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.router.navigate(['/dashboard']);
    window.location.reload();

  }
}
