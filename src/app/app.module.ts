import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { FooterLayoutComponent } from './footer-layout/footer-layout.component';
import { LbdModule } from './lbd/lbd.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TypographyComponent } from './banque/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {TransactionService} from "./transaction/transaction .service";

const appRoutes: Routes = [
  { path: 'maps', component: MapsComponent },
  {
    path: '', component: FooterLayoutComponent, children:
    [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'transaction', component: TransactionComponent },
      { path: 'banque', component: TypographyComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterLayoutComponent,
    DashboardComponent,
    UserComponent,
    TransactionComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyAEPDOJl5CPLz6NZcMqJBqZWfVXec3UsJg' }),
    LbdModule
  ],
  providers: [TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }