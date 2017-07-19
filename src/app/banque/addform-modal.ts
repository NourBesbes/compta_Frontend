/**
 * Created by nour on 7/8/17.
 */
import { Component, OnInit} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import {BanqueService} from "./banque.service";
import { AlertService } from '../_services/index';
import { Modal ,BSModalContext} from 'angular2-modal/plugins/bootstrap';
import { Banque } from '../_models/banque';
export class CustomModalContext extends BSModalContext {
  public _id:string;
  public name: string;
  public swift: string;
  public IBAN: string;
  public Banque: string;
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
                    <h1>Ajouter Banque</h1>
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
    <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !swift.valid }">
      <label class="col-sm-3 control-label" for="swift">swift</label>
      <input type="text" class="form-control" name="swift" [(ngModel)]="model.swift" #swift="ngModel" required />
      <div *ngIf="!swift.valid" class="help-block">swift is required</div>
    </div>

    <div class="form-group" >
      <label class="col-sm-3 control-label" for="IBAN">IBAN</label>
      <input type="text" class="form-control" name="IBAN" [(ngModel)]="model.IBAN" #IBAN="ngModel" required />
      <div *ngIf="!IBAN.valid" class="help-block">IBAN is required</div>
    </div>
    <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !IBAN.valid }">
      <label class="col-sm-3 control-label"  for="Banque">banque</label>
      <input type="text" class="form-control" name="banque" [(ngModel)]="model.Banque" #Banque="ngModel" required />
      <div *ngIf="!Banque.valid" class="help-block">Banque is required</div>
    </div>
    <!-- Button -->
    <div class="col-md-12">
      <div class="form-group">
        <button id="singlebutton125" class="btn btn-info" [disabled]="!f.form.valid" (onclick)="add()" >Ajouter Banque</button>
        <button type="button" class="btn btn-danger" (click)="closeAdd()">Cancel</button>

      </div>
    </div>
  </form>
        </div>`
})
export class AddModal implements ModalComponent<CustomModalContext>,OnInit {
  context: CustomModalContext;
  model:any = {name:"",swift:'',IBAN:'',Banque:''};
  loading = false;


  constructor(public dialog: DialogRef<CustomModalContext>,private alertService: AlertService,private banqueService: BanqueService,public modal: Modal) {
    this.context = dialog.context;
  }
  public ngOnInit() {
    console.log("hello from add model"+this.context);
    this.model.name=this.context.name ;
    this.model.swift=this.context.swift ;
    this.model._id=this.context._id ;
    this.model.Banque=this.context.Banque ;
    this.model.IBAN=this.context.IBAN ;

  }

  add() {
    console.log(this.model);
    this.banqueService.add(this.model)
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
