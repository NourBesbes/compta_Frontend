/**
 * Created by nour on 7/8/17.
 */
import { Component, OnInit} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { AlertService } from '../_services/index';
import { Modal ,BSModalContext} from 'angular2-modal/plugins/bootstrap';
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
       <form name="form" (ngSubmit)="f.form.valid && add()" #f="ngForm" novalidate>

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
        <button id="singlebutton125" class="btn btn-info" [disabled]="!f.form.valid" (onclick)="add()" >Ajouter Budget</button>
        <button type="button" class="btn btn-danger" (click)="closeAdd()">Cancel</button>

      </div>
    </div>
  </form>
        </div>`
})
export class BudgetAddModal implements ModalComponent<CustomModalContext>,OnInit {
  context: CustomModalContext;
  model:any = {name:"",sousBudget:'',categorie:''};
  loading = false;


  constructor(public dialog: DialogRef<CustomModalContext>,private alertService: AlertService
    ,private configService: ConfigService,public modal: Modal) {
    this.context = dialog.context;
  }
  public ngOnInit() {
    console.log("hello from add model"+this.context);

  }

  add() {

    this.configService.add(this.model)
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
