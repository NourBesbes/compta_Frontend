import {Component, OnInit} from '@angular/core';
import { NavItem, NavItemType } from './lbd/lbd.module';
import {CompanyService} from "./_services/company.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public navItems: NavItem[];

  company:any={name:'',matricule:''};
  constructor(private companyService:CompanyService) {
  }

  public ngOnInit(): void {
    var user=JSON.parse(localStorage.getItem("currentUser"));
    this.companyService.getCompany(user.company).subscribe(data => this.company=data);


    this.navItems = [
      { type: NavItemType.Sidebar, title: 'Dashboard', routerLink: 'dashboard', iconClass: 'pe-7s-graph' },
      { type: NavItemType.Sidebar, title: 'User Profile', routerLink: 'user', iconClass: 'pe-7s-user' },
      { type: NavItemType.Sidebar, title: 'Transactions', routerLink: 'transaction', iconClass: 'pe-7s-note2' },
      { type: NavItemType.Sidebar, title: 'Banque', routerLink: 'banque', iconClass: 'pe-7s-news-paper' },

      { type: NavItemType.Sidebar, title: 'Configuration', routerLink: 'config', iconClass: 'pe-7s-tools' },
      { type: NavItemType.Sidebar, title: 'Documents Comptables', routerLink: 'doc', iconClass: 'pe-7s-copy-file' },
      { type: NavItemType.Sidebar, title: 'Administration', routerLink: 'admin', iconClass: 'pe-7s-lock' },
      { type: NavItemType.Sidebar, title: 'Super Administration', routerLink: 'superadmin', iconClass: 'pe-7s-lock' },


     // { type: NavItemType.NavbarRight, title: 'Account' ,routerLink: 'user' },

      { type: NavItemType.NavbarRight, title: 'Log out' }
    ];
  }
}
