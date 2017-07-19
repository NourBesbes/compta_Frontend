/**
 * Created by nour on 7/8/17.
 */
import { Component, OnInit} from '@angular/core';
import {NotificationService, NotificationType, NotificationOptions} from '../lbd/services/notification.service';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { Modal ,BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {UserService} from "../_services/user.service";

export class CustomModalContext extends BSModalContext {
  public _id:string;
  public username: string;
  public email:string;
  public role:string;
  public first_name:string;
  public last_name:string;

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
                    <h1>Modifier Banque</h1>
                </div>
            </div>
       <form name="form" (ngSubmit)="f.form.valid && Update(model)" #f="ngForm" novalidate>

    <div class="form-group" [ngClass]="{ 'has-error': f.submitted  }">
      <label class="control-label" for="first_name">first_name</label>
      <input type="text" class="form-control" name="first_name" [(ngModel)]="model.first_name" #first_name="ngModel"  minlength="4" maxlength="20" required />
      <div *ngIf="first_name.errors && (first_name.dirty || first_name.touched)" class="alert alert-danger">
        <div [hidden]="!first_name.errors.minlength">
          Name must be at least 4 characters long.
        </div>
        <div [hidden]="!username.errors.maxlength">
          Name cannot be more than 20 characters long.
        </div>

      </div>
    </div>
    <div class="form-group" [ngClass]="{ 'has-error': f.submitted  }">
      <label class="control-label" for="Name">last_name</label>
      <input type="text" class="form-control" name="last_name" [(ngModel)]="model.last_name" #last_name="ngModel"  minlength="4" maxlength="20" required />
      <div *ngIf="last_name.errors && (last_name.dirty || last_name.touched)" class="alert alert-danger">
        <div [hidden]="!last_name.errors.minlength">
          Name must be at least 4 characters long.
        </div>
        <div [hidden]="!last_name.errors.maxlength">
          Name cannot be more than 20 characters long.
        </div>

      </div>
    </div>

    <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !role.valid }">
      <label class="col-sm-3 control-label" for="swift">role</label>
      <input type="text" class="form-control" name="role" [(ngModel)]="model.role" #role="ngModel" required />
      <div *ngIf="!role.valid" class="help-block">role is required</div>
    </div>

    <div class="form-group" >
      <label class="col-sm-3 control-label" for="email">email</label>
      <input type="text" class="form-control" name="email" [(ngModel)]="model.email" #email="ngModel" required />
      <div *ngIf="!email.valid" class="help-block">email is required</div>
    </div>
 
    <!-- Button -->
    <div class="col-md-12">
      <div class="form-group">
        <button id="singlebutton125" class="btn btn-info" [disabled]="!f.form.valid" (onclick)="Update(model)" >Modifier User</button>
        <button type="button" class="btn btn-danger" (click)="closeUpdate()">Cancel</button>

      </div>
    </div>
  </form>
        </div>`
})
export class UpdateAdminModal implements ModalComponent<CustomModalContext>,OnInit {
  context: CustomModalContext;
  model:any = {username:"",email:'',role:'',first_name:'',last_name:''};

  constructor(public dialog: DialogRef<CustomModalContext>,private userService: UserService,public modal: Modal,private notificationService: NotificationService) {
    this.context = dialog.context;
  }
  public ngOnInit() {
    console.log("hello from update model"+this.context);
    this.model.username=this.context.username ;
    this.model.email=this.context.email ;
    this.model._id=this.context._id ;
    this.model.role=this.context.role ;
    this.model.first_name=this.context.first_name ;
    this.model.last_name=this.context.last_name ;
  }


  public Update(user:any)
  {
    this.userService.update(user).subscribe((data) => {

      console.log(data);
      const type = Math.floor((Math.random() * 4) + 1);

      this.dialog.close();
      this.notificationService.notify(new NotificationOptions({
        message: 'Votre user - a été modifié',
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
