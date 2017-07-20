import {Component, OnInit, trigger, state, transition, style} from '@angular/core';
import {Http} from "@angular/http";
import {NavbarTitleService} from "../lbd/services/navbar-title.service";
import {NotificationService, NotificationType, NotificationOptions} from "../lbd/services/notification.service";
import {Modal, overlayConfigFactory} from "angular2-modal";
import {AlertService} from "../_services/alert.service";
import {ConfigService} from "./config.service";
import {Budget} from "../_models/budget";
import {BudgetUpdateModal} from "./updateform-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {BudgetAddModal} from "./addform-modal";
import {BudgetPipe} from "./budget.pipe";


@Component({
  selector: 'ConfigComponent',
  templateUrl: './config.component.html',
  pipes: [BudgetPipe]  ,
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  public budgets :any [] ;
  public sousBudgets :any [] ;
  public searchText :string ;

  sousBudgetmodel:any={sousBudget:'', _id:''}

  p: number = 1;
  d: number = 1;

  model:any = {sousBudget:'',id:''};
  SelectedBudget : Object = {};

  constructor(private navbarTitleService: NavbarTitleService,private http: Http,private configService: ConfigService,


              private alertService: AlertService,public modal: Modal,private notificationService: NotificationService) { }

  public ngOnInit() {
    var user=JSON.parse(localStorage.getItem("currentUser"));
    this.navbarTitleService.updateTitle('Gestion des budgets');
    // Retrieve banks from the API
    this.configService.getAll(user.company).subscribe(budgets => {
      this.budgets = budgets;
    });

  }

  public delete(budget:Budget){
    if (confirm('Are you sure you want to delete ' + budget.name)) {

      var budgets = this.budgets;
      const type = Math.floor((Math.random() * 4) + 1);

      this.configService.delete(budget._id).subscribe(data => {
        this.notificationService.notify(new NotificationOptions({
          message: 'Le budget a été supprimé',
          icon: 'pe-7s-trash',
          type: <NotificationType>(type),
          from: 'top',
          align: 'right'
        }));
        this.configService.getAll().subscribe(budgets => {
          this.budgets = budgets;
        });

      });

    }
  }

  onClickUpdate(budget:Budget) {
    return this.modal.open(BudgetUpdateModal,  overlayConfigFactory(budget, BSModalContext)).then(res=>

      console.log(res)
    )
  }
  onClickAdd(budget:Budget) {
    return this.modal.open(BudgetAddModal,  overlayConfigFactory(budget, BSModalContext))
  }

  addSousBudget(budget:Budget) {
    this.model._id=budget._id;
    budget.sousBudget=this.model.sousBudget ;

    this.configService.addSousBudget(budget)
      .subscribe(
        data => {
          window.location.reload();

        })
  }

  public getsousBudget()
  {
    this.sousBudgets=this.SelectedBudget["sousBudget"];

  }

  public deleteSousBudget(sousbudget) {
    if (confirm('Are you sure you want to delete ' + sousbudget)) {
      const type = Math.floor((Math.random() * 4) + 1);
      this.sousBudgetmodel.id = this.SelectedBudget["_id"];
      this.sousBudgetmodel.sousBudget = sousbudget;
      console.log(this.sousBudgetmodel);
      this.configService.deleteSousBudget(this.sousBudgetmodel).subscribe(
        data => {
          this.notificationService.notify(new NotificationOptions({
            message: 'Le sous budget a été supprimé',
            icon: 'pe-7s-trash',
            type: <NotificationType>(type),
            from: 'top',
            align: 'right'
          }));

          this.sousBudgets = this.SelectedBudget["sousBudget"];

        })
    }
  }

  }


