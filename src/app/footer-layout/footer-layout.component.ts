import { Component, OnInit } from '@angular/core';
import { FooterItem } from '../lbd/lbd-footer/lbd-footer.component';

@Component({
  selector: 'app-footer-layout',
  templateUrl: './footer-layout.component.html'
})
export class FooterLayoutComponent implements OnInit {
  public footerItems: FooterItem[];
  public copyright: string;

  constructor() { }

  public ngOnInit() {

    this.copyright = '&copy; 2017 <a href="http://www.devstriker.com">Devstriker</a>, made with love ';
  }
}
