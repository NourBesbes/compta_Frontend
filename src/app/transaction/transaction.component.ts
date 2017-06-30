import {Component, OnInit, trigger, state, style, transition, animate, ViewChild} from '@angular/core';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';
import { TransactionService } from '../transaction/transaction .service';
import { Http } from '@angular/http';
import {Popup} from 'ng2-opd-popup';
@Component({
  selector: 'app-table',
  templateUrl: 'transaction.component.html',
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


  constructor(private navbarTitleService: NavbarTitleService,private popup:Popup,private http: Http,private transactionService: TransactionService) {
    this.filesToUpload = [];
  }

  public ngOnInit() {
    this.navbarTitleService.updateTitle('Transactions');

    // Retrieve transactions from the API
    this.transactionService.getAllTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });


  }
  //Upload file

  @ViewChild('popup1') popup1: Popup;
  ClickButton(){
    this.popup1.options = {
      header: "Importer",
      color: "#5cb85c", // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "OK", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-default", // your class for styling the confirm button
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
    this.popup1.show(this.popup1.options);
  }

  upload() {
    this.transactionService.makeFileRequest("http://localhost:3000/transaction/upload", [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    });
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

//Add budget
  @ViewChild('popup2') popup2: Popup;
  ClickButtonEdit(){
    this.popup2.options = {
      header: "Edit",
      color: "#5cb85c", // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "OK", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-default", // your class for styling the confirm button
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
    this.popup2.show(this.popup2.options);
  }

}








