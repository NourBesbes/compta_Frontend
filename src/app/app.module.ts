import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppComponent } from './app.component';
import { FooterLayoutComponent } from './footer-layout/footer-layout.component';
import { LbdModule } from './lbd/lbd.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TypographyComponent } from './banque/typography.component';
import { IconsComponent } from './icons/icons.component';
import { ConfigComponent } from './config/config.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {TransactionService} from './transaction/transaction .service';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import {PopupModule} from 'ng2-opd-popup';



const appRoutes: Routes = [
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  {path: '', component: FooterLayoutComponent, canActivate: [AuthGuard], children:
    [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'transaction', component: TransactionComponent },
      { path: 'banque', component: TypographyComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: '**', redirectTo: 'deshboard' },
      { path: 'config', component: ConfigComponent }

    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
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
    ConfigComponent,
    NotificationsComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    PopupModule.forRoot(),
    //AgmCoreModule.forRoot({ apiKey: 'AIzaSyAEPDOJl5CPLz6NZcMqJBqZWfVXec3UsJg' }),
    LbdModule,
    AccordionModule.forRoot()
],
  providers: [
    TransactionService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
