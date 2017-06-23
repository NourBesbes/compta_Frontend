import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import { TableData } from '../lbd/lbd-table/lbd-table.component';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';
import { TransactionService } from '../transaction/transaction .service';
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
  public tableData: TableData;
  public files : FileList;
  constructor(private navbarTitleService: NavbarTitleService,private transactionService: TransactionService) { }

  public ngOnInit() {
    this.navbarTitleService.updateTitle('Transactions');

    this.tableData = {
      headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
      dataRows: [
        ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout'],
        ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
        ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux'],
        ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park'],
        ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten'],
        ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester']
      ]
    };

    // Retrieve transactions from the API
    this.transactionService.getAllTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });


  }

  getFiles(event){
    this.files = event.target.files;
    console.log(this.files);
  }




}








