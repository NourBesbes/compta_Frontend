import {Component, OnInit} from '@angular/core';
import { NavItem, NavItemType } from './lbd/lbd.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public navItems: NavItem[];
public bool:boolean=true;
  constructor() {
  }

  public ngOnInit(): void {
    if (!localStorage.getItem("currentUser"))
    this.bool=false;
    else this.bool=true;

    this.navItems = [
      { type: NavItemType.Sidebar, title: 'Dashboard', routerLink: 'dashboard', iconClass: 'pe-7s-graph' },
      { type: NavItemType.Sidebar, title: 'User Profile', routerLink: 'user', iconClass: 'pe-7s-user' },
      { type: NavItemType.Sidebar, title: 'Transactions', routerLink: 'transaction', iconClass: 'pe-7s-note2' },
      { type: NavItemType.Sidebar, title: 'Banque', routerLink: 'banque', iconClass: 'pe-7s-news-paper' },

      { type: NavItemType.Sidebar, title: 'Configuration', routerLink: 'config', iconClass: 'pe-7s-tools' },
      { type: NavItemType.Sidebar, title: 'Documents Comptables', routerLink: 'doc', iconClass: 'pe-7s-copy-file' },
      { type: NavItemType.NavbarLeft, title: 'Dashboard', iconClass: 'fa fa-dashboard' },
      { type: NavItemType.Sidebar, title: 'Administration', routerLink: 'icons', iconClass: 'pe-7s-lock' },



      { type: NavItemType.NavbarRight, title: 'Account' ,routerLink: 'user' },

      { type: NavItemType.NavbarRight, title: 'Log out' }
    ];
  }
}
