import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  model:any = {name:'',matricule:'',adress:''};
  loading = false;
  constructor(private localStorage: LocalStorageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }
  register() {
    this.loading=true;
    console.log(this.model);
    localStorage.setItem('currentCompany', JSON.stringify(this.model));
    this.router.navigate(['register']);
  }
}
