/**
 * Created by nour on 7/17/17.
 */
import { Component, OnInit} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { AlertService } from '../_services/index';
import { Modal ,BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {TransactionService} from "./transaction .service";
import {Transaction} from "../_models/transaction";
import {ConfigService} from "../config/config.service";

export class CustomModalContext extends BSModalContext {
  public _id:string;
  public budget: string;
  public sousBudget: string;


}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'modal-content',
  styles: [`
        .custom-modal-container {
            padding: 15px;
        }

        .custom-modal-header {
            background-color: #4091ff;
            color: #fff;
            -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
            margin-top: -15px;
            margin-bottom: 40px;
            font-size: 20px;
        }
        h1, .h1 {
            font-size: 35px;
            margin:3.5%;
            text-align: center;
            
          }
    `],
  //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
  // Remove when solved.
  /* tslint:disable */ template: `
    <div class="container-fluid custom-modal-container">
            <div class="row custom-modal-header">
                <div class="col-sm-14">
                    <h1>Ajouter Budget</h1>
                </div>
      
            </div>
       <form name="form" (ngSubmit)="f.form.valid && addInfo()" #f="ngForm">

    <div class="form-group" >
      <label class="col-sm-3 control-label">Budget</label>
      <select  [(ngModel)]="SelectedBudget" class="col-md-6 form-control" ng-required="true" [ngModelOptions]="{standalone: true}"  >
        <option *ngFor='let budget of budgets' [ngValue]="budget" >{{budget.name}}</option>
      </select>
    </div>
    <div class="form-group" >
      <label class="col-sm-3 control-label">Sous Budget</label>
      <select  [(ngModel)]="SelectedSousBudget" class="col-md-6 form-control" ng-required="true" [ngModelOptions]="{standalone: true}" >
        <option *ngFor='let sousBudget of SelectedBudget["sousBudget"]' [ngValue]="sousBudget" >{{sousBudget}}</option>
      </select>
    </div>
    <!-- Button -->
    <div class="col-md-12">
      <div class="form-group">
        <button id="singlebutton125" class="btn btn-info" [disabled]="!f.form.valid" (onclick)="addInfo()" >Ajouter Budget</button>
        <button type="button" class="btn btn-danger" (click)="closeAdd()">Cancel</button>

      </div>
    </div>
  </form>
        </div>`
})
export class BudgetModal implements ModalComponent<CustomModalContext>,OnInit {
  context: CustomModalContext;
  model:any = {budget:'',sousBudget:''};
  loading = false;
  public budgets :any [] ;
  public sousBudgets :any [] ;
  SelectedBudget : Object = {};
  SelectedSousBudget : Object = {};


  constructor(public dialog: DialogRef<CustomModalContext>,private alertService: AlertService,private configService :ConfigService,private transactionService: TransactionService,public modal: Modal) {
    this.context = dialog.context;
  }
  public ngOnInit() {
    console.log("hello from add model"+this.context);
    var user=JSON.parse(localStorage.getItem("currentUser"));
    this.configService.getAll(user.company).subscribe(budgets => {
      this.budgets = budgets;
    });
    this.sousBudgets=this.SelectedBudget["sousBudget"];

  }

  addInfo() {
    this.model.id=this.context._id ;
    this.model.budget=this.SelectedBudget["name"];
    this.model.sousBudget=this.SelectedSousBudget;
    console.log(this.model);
    this.transactionService.addInfo(this.model)
      .subscribe(
        data => {
         this.dialog.close();
         window.location.reload();

        })
  }

  closeAdd(){
    this.dialog.close();

  }

}
