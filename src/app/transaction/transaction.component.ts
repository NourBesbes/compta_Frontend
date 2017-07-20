import {Component, OnInit, trigger, state, style, transition, animate, ViewChild} from '@angular/core';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';
import { TransactionService } from '../transaction/transaction .service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Transaction } from '../_models/transaction';
import {NotificationService, NotificationType, NotificationOptions} from '../lbd/services/notification.service';
import {UploadModal} from "./upload-modal";
import {  overlayConfigFactory } from 'angular2-modal';
import { Modal ,BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {BudgetModal} from "./budget-modal";
import {TransactionPipe} from "./transaction.pipe";

@Component({
  selector: 'app-table',
  templateUrl: 'transaction.component.html',
  pipes:[TransactionPipe],
  styleUrls: ['./transaction.css'],
  animations: [
    trigger('cardtable1', [
      state('*', style({
        '-ms-transform': 'translate3D(0px, 0px, 0px)',
        '-webkit-transform': 'translate3D(0px, 0px, 0px)',
        '-moz-transform': 'translate3D(0px, 0px, 0px)',
        '-o-transform': 'translate3D(0px, 0px, 0px)',
        transform: 'translate3D(0px, 0px, 0px)',
        opacity: 1})),
      transition('void => *', [
        style({opacity: 0,
          '-ms-transform': 'translate3D(0px, 150px, 0px)',
          '-webkit-transform': 'translate3D(0px, 150px, 0px)',
          '-moz-transform': 'translate3D(0px, 150px, 0px)',
          '-o-transform': 'translate3D(0px, 150px, 0px)',
          transform: 'translate3D(0px, 150px, 0px)',
        }),
        animate('0.3s 0s ease-out')
      ])
    ]),
  ]
})
export class TransactionComponent implements OnInit {
  transactions: any = [];
  filesToUpload: Array<File>;
  p: number = 1;
  public searchText:string;

  constructor(private navbarTitleService: NavbarTitleService,public modal: Modal,private http: Http,private transactionService: TransactionService
    ,private notificationService: NotificationService) {
    this.filesToUpload = [];
  }

  public ngOnInit() {
    this.navbarTitleService.updateTitle('Transactions');
   var self = this ;
    var user=JSON.parse(localStorage.getItem("currentUser"));
    // Retrieve transactions from the API
    this.transactionService.getAllTransactions(user.company).subscribe(transactions => {
console.log(transactions);
      transactions.forEach(function (j) {
        var x ;
        var Montant ;
        if (j.Debit) {Montant="+"+j.Debit}
        if (j.Credit) {Montant="-"+j.Credit}
        x = {
          Date: j.Date.split("T")[0],
          Libelle: j.Libelle,
          Montant: Montant,
          _id:j._id,
          CompteBancaire:j.CompteBancaire,
          budget:j.budget,
          sousBudget:j.sousBudget,
          color:true
        };
        self.transactions.push(x)
      })
console.log("hi");
    // this.transactions = transactions;
    });


  }
  //Upload file


 // upload() {
    //this.transactionService.makeFileRequest("http://localhost:3000/transaction/upload", [], this.filesToUpload)
    //  .then((result) => console.log(result));
//}
  public deleteTransaction(transaction:Transaction){
    if (confirm('Are you sure you want to delete ' + transaction.Libelle)) {

      var transactions = this.transactions;
      const type = Math.floor((Math.random() * 4) + 1);

      this.transactionService.delete(transaction._id).subscribe(data => {

        this.notificationService.notify(new NotificationOptions({
          message: 'La transaction a été supprimée',
          icon: 'pe-7s-trash',
          type: <NotificationType>(type),
          from: 'top',
          align: 'right'
        }));
        window.location.reload();

      });
    }

  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }


  onClickUpload() {
    return this.modal.open(UploadModal,  overlayConfigFactory(BSModalContext))
  }

  onClickEdit(transaction:Transaction) {
    return this.modal.open(BudgetModal,  overlayConfigFactory(transaction, BSModalContext))
  }

}








