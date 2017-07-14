/**
 * Created by nour on 7/8/17.
 */
import { Component, OnInit} from '@angular/core';
import {NotificationService, NotificationType, NotificationOptions} from '../lbd/services/notification.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { Modal ,BSModalContext} from 'angular2-modal/plugins/bootstrap';
import { Budget } from '../_models/budget';
import {ConfigService} from "./config.service";
export class CustomModalContext extends BSModalContext {
  _id:string;
  name: string;
  sousBudget : string;
  categorie:string ;
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
        }
        h1, .h1 {
            font-size: 35px;
            margin:3.5%;
            text-align: center;
            font-style: normal;
            
          }
    `],
  //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
  // Remove when solved.
  /* tslint:disable */ template: `
    <div class="container-fluid custom-modal-container">
            <div class="row custom-modal-header">
                <div class="col-sm-14">
                    <h1>Modifier Budget</h1>
                </div>
            </div>
       <form name="form" (ngSubmit)="f.form.valid && updateBudget(model)" #f="ngForm" novalidate>

    <div class="form-group" [ngClass]="{ 'has-error': f.submitted  }">
      <label class="control-label" for="Name">Name</label>
      <input type="text" class="form-control" name="name" [(ngModel)]="model.name" #Name="ngModel"  minlength="4" maxlength="20" required />
      <div *ngIf="Name.errors && (Name.dirty || Name.touched)" class="alert alert-danger">
        <div [hidden]="!Name.errors.minlength">
          Name must be at least 4 characters long.
        </div>
        <div [hidden]="!Name.errors.maxlength">
          Name cannot be more than 20 characters long.
        </div>

      </div>
    </div>
    
    
    <!-- Button -->
    <div class="col-md-12">
      <div class="form-group">
        <button id="singlebutton125" class="btn btn-info" [disabled]="!f.form.valid" (onclick)="updateBudget(model)" >Modifier Budget</button>
        <button type="button" class="btn btn-danger" (click)="closeUpdate()">Cancel</button>

      </div>
    </div>
  </form>
        </div>`
})
export class BudgetUpdateModal implements ModalComponent<CustomModalContext>,OnInit {
  context: CustomModalContext;
  model:any = {name:"nour"};

  constructor(public dialog: DialogRef<CustomModalContext>,private configService: ConfigService,public modal: Modal,private notificationService: NotificationService) {
    this.context = dialog.context;
  }
  public ngOnInit() {
    console.log("hello from update model"+this.context);
    this.model.name=this.context.name ;
    this.model.sousBudget=this.context.sousBudget ;
    this.model._id=this.context._id ;
    this.model.categorie=this.context.categorie ;

  }

  public updateBudget(budget:Budget){
    var _budget = {
      _id:budget._id,
    name: budget.name,
    sousBudget : budget.sousBudget,
    categorie:budget.categorie

    };

    this.configService.update(_budget).subscribe(data => {
      console.log(data);
      console.log(_budget);
      const type = Math.floor((Math.random() * 4) + 1);
      this.dialog.close();
      this.notificationService.notify(new NotificationOptions({
        message: 'Votre budget - a été modifié',
        icon: 'pe-7s-gift',
        type: <NotificationType>(type),
        from: 'top',
        align: 'right'
      }));
      window.location.reload();

    });
  }
  closeUpdate(){
    this.dialog.close();

  }
}
