import {Component, OnInit, trigger, state, style, transition, animate, Input} from '@angular/core';
import {NotificationService, NotificationType, NotificationOptions} from '../lbd/services/notification.service';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import {DocumentService} from "./document.service";

@Component({
  selector: 'app-notifications',
  templateUrl: 'document.component.html',
  styleUrls: ['document.component.css'],
  animations: [
    trigger('cardnotifications', [
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
    ])
  ]
})
export class DocumentComponent implements OnInit {
  //Journal Comptable
  options: NgDateRangePickerOptions;
  public startdate:string ;
  public enddate:string ;
  model:any = {startdate:'',enddate:''};
  transactions: any = [];
  depenses: any = [];
  recettes: any = [];
  //Exercice Comptable
  optionsEx: NgDateRangePickerOptions;
  public startdateExComp:string ;
  public enddateExComp:string ;
  public modelExComp:any = {startdate:'',enddate:''};
  public exercices=[];




  constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService,
              private documentService : DocumentService) { }

  public ngOnInit() {
    this.navbarTitleService.updateTitle('Documents Comptable');
    this.getAllJournal();
    this.getAllExercice();
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yMd',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 1
    };
    this.optionsEx = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yMd',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 1
    };
  }

  public getAllJournal()
  {
    var user=JSON.parse(localStorage.getItem("currentUser"));

    this.documentService.getJournalComptable1(user.company).subscribe(
      data => {
        this.transactions=data ;
        this.depenses=this.transactions.Depenses;
        this.recettes=this.transactions.Recettes;

      }
    )
  }
  public getJournalComptable(value:string) {
    var user=JSON.parse(localStorage.getItem("currentUser"));
    this.transactions=[];
    this.depenses=[];
    this.recettes=[];
    this.startdate=value.split("-")[0];
    this.enddate=value.split("-")[0];
    this.model={"startdate":this.startdate,"enddate":this.enddate};
    this.documentService.getExerciceComptable(this.model,user.company)
      .subscribe(
        data => {
          this.transactions=data ;
          this.depenses=this.transactions.Depenses;
          this.recettes=this.transactions.Recettes;
          console.log(this.transactions);
          console.log(this.recettes);
        })
  }



  public sortByProperty(array, propertyName) {
  return array.sort(function (a, b) {
    return a[propertyName] - b[propertyName];
  });
}
  public getAllExercice()
  {
    var user=JSON.parse(localStorage.getItem("currentUser"));
    var tab=[];
    var i=0;
    this.documentService.getExerciceComptable1(user.company).subscribe(
      data => {
        var transactions = this.sortByProperty(data, "Budget");
        tab.push(transactions[0]);
        for (i = 1; i < transactions.length; i++) {
        if (transactions[i].Budget == transactions[i - 1].Budget) {
          tab.push(transactions[i]);
        }
        else {
          this.exercices.push({"Budget": transactions[i - 1].Budget, "Transactions": tab});
          tab = [];
        };
          if (i == (transactions.length - 1)) {
            tab.push(transactions[i]);
            this.exercices.push({"Budget": transactions[i].Budget, "Transactions": tab});
          }
      }

      }
    )
  }

  public getExerciceComptable(valueEx:string) {
    var user=JSON.parse(localStorage.getItem("currentUser"));
    this.exercices=[];
    var tab=[];
    var i=0;
    this.startdateExComp=valueEx.split("-")[0];
    this.enddateExComp=valueEx.split("-")[0];
    this.modelExComp={"startdate":this.startdate,"enddate":this.enddate};
    this.documentService.getExerciceComptable(this.modelExComp,user.company)
      .subscribe(
        data => {
          var transactions = this.sortByProperty(data, "Budget");
          tab.push(transactions[0]);
          for (i = 1; i < transactions.length; i++) {
            if (transactions[i].Budget == transactions[i - 1].Budget) {
              tab.push(transactions[i]);
            }
            else {
              this.exercices.push({"Budget": transactions[i - 1].Budget, "Transactions": tab});
              tab = [];
            };
            if (i == (transactions.length - 1)) {
              tab.push(transactions[i]);
              this.exercices.push({"Budget": transactions[i].Budget, "Transactions": tab});
            }
          }

        })
  }



}
