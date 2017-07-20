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
import {AdminComponent} from './admin/admin.component';
import { ConfigComponent } from './config/config.component';
import { DocumentComponent } from './documents/document.component'
import {TransactionService} from './transaction/transaction .service';
import { AlertComponent } from './_directives/index';
import { AuthGuard,AuthCompany,AuthAdmin,AuthSuperadmin } from './_guards/index';
import { AlertService, AuthenticationService, UserService ,CompanyService} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { RegisterCompanyComponent} from './register-company/register-company.component';
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
import {ConfigService} from "./config/config.service";
import {BudgetUpdateModal} from "./config/updateform-modal";
import {BudgetAddModal} from "./config/addform-modal";
import { RegisterUserComponent } from './register-user/register-user.component';
import {BudgetModal} from "./transaction/budget-modal";
import { SuperAdminComponent } from './super-admin/super-admin.component';
import {UpdateAdminModal} from "./admin/updateform-modal";
import {BanquePipe} from "./banque/banque.pipe";
import {BudgetPipe} from "./config/budget.pipe";
import {TransactionPipe} from "./transaction/transaction.pipe";
import {UserPipe} from "./admin/admin.pipe";

const appRoutes: Routes = [
  { path: 'superadmin', component: SuperAdminComponent, canActivate: [AuthSuperadmin] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent,canActivate: [AuthCompany] },
  { path: 'registerC', component: RegisterCompanyComponent },
  { path: 'registerUser/:_id', component:  RegisterUserComponent },
  {path: '', component: FooterLayoutComponent, canActivate: [AuthGuard], children:
    [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'transaction', component: TransactionComponent },
      { path: 'banque', component: BanqueComponent },
      { path: 'admin', component: AdminComponent,canActivate: [AuthAdmin] },
      { path: 'doc', component: DocumentComponent },
      { path: 'config', component: ConfigComponent },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    BanquePipe,
    BudgetPipe,
    TransactionPipe,
    UserPipe,
    FooterLayoutComponent,
    DashboardComponent,
    UserComponent,

    TransactionComponent,
    BanqueComponent,
    AdminComponent,
    ConfigComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterCompanyComponent,
    RegisterComponent,
    AdminHomeComponent,
    DocumentComponent,
    CustomModal,
    AddModal,
    UploadModal,
    BudgetUpdateModal,
    BudgetAddModal,
    RegisterUserComponent,
    BudgetModal,
    SuperAdminComponent,
    UpdateAdminModal,

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
    BanquePipe,
    TransactionPipe,
    TransactionService,
    AuthGuard,
    AuthAdmin,
    AuthCompany,
    AuthSuperadmin,
    AlertService,
    AuthenticationService,
    UserService,
    BanqueService,
    DocumentService,
    CompanyService,
    ConfigService],
  bootstrap: [AppComponent],
  entryComponents: [ CustomModal,AddModal,UploadModal,BudgetUpdateModal,BudgetAddModal,BudgetModal,UpdateAdminModal]


})
export class AppModule {



}
