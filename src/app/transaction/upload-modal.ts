/**
 * Created by nour on 7/9/17.
 */
import { Component} from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import {TransactionService} from "./transaction .service";
import { Modal ,BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {NotificationService, NotificationType, NotificationOptions} from '../lbd/services/notification.service';
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
             width:100% ;
             height:100%;
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
        h1 {
            font-size: 35px;
            margin:3.5%;
            text-align: center;
            
          }
    `],
  //TODO: [ngClass] here on purpose, no real use, just to show how to workaround ng2 issue #4330.
  // Remove when solved.
  /* tslint:disable */ template: `
    <div class="custom-modal-container">
            <div class="row custom-modal-header">
                <div class="col-sm-12">
                    <h1>Importer</h1>
                </div>
            </div>
            <div class="row" [ngClass]="{'myclass' : shouldUseMyClass}">
                <div class="col-xs-14">
            <div class="form-group" >
      <label class="col-sm-3 control-label" for="File"> Fichier </label>
       <input type="file" (change)="fileChangeEvent($event)" placeholder="Upload file..." />
       </div><br><br>
      <div class="form-group">
        <button id="singlebutton125" class="btn btn-info" (click)="upload()" >Importer</button>
        <button type="button" class="btn btn-danger" (click)="closeUpload()">Cancel</button>
      </div>  </div></div>     
     </div>`
})
export class UploadModal implements ModalComponent<CustomModalContext> {
  context: CustomModalContext;
  filesToUpload: Array<File>;
  user :any ;

  constructor(public dialog: DialogRef<CustomModalContext>,private notificationService: NotificationService,private transactionService: TransactionService,public modal: Modal) {
    this.context = dialog.context;
  }
  public ngOnInit() {
    console.log("hello from upload model");
    this.user=JSON.parse(localStorage.getItem("currentUser"));


  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }
  upload() {
    const type = Math.floor((Math.random() * 4) + 1);
    this.transactionService.makeFileRequest("http://localhost:3000/transaction/upload/"+this.user.company, [], this.filesToUpload);
    this.dialog.dismiss();
    this.notificationService.notify(new NotificationOptions({
      message: 'Votre fichier - a été importé',
      icon: 'pe-7s-file',
      type: <NotificationType>(type),
      from: 'top',
      align: 'right'
    }))

  }
  closeUpload(){
    this.dialog.close();
  }

}
