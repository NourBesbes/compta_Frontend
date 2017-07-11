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
import { BanqueComponent } from './banque/banque.component';
import { IconsComponent } from './icons/icons.component';
import { ConfigComponent } from './config/config.component';
import { DocumentComponent } from './documents/document.component'
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
import {CustomModal} from './banque/updateform-modal'
import {AddModal} from './banque/addform-modal'
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import {UploadModal} from "./transaction/upload-modal";
import {NgxPaginationModule} from 'ngx-pagination';
import { NgDateRangePickerModule } from 'ng-daterangepicker';
import {BanqueService} from "./banque/banque.service";
import {DocumentService} from "./documents/document.service";

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
      { path: 'banque', component: BanqueComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'doc', component: DocumentComponent },
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
    BanqueComponent,
    IconsComponent,
    ConfigComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    DocumentComponent,
    CustomModal,
    AddModal,
    UploadModal
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
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    NgxPaginationModule,
    NgDateRangePickerModule
],
  providers: [
    TransactionService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    BanqueService,
    DocumentService],
  bootstrap: [AppComponent],
  entryComponents: [ CustomModal,AddModal,UploadModal ]


})
export class AppModule { }
