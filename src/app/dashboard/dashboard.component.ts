import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import { Task } from '../lbd/lbd-task-list/lbd-task-list.component';
import {NotificationService, NotificationOptions} from '../lbd/services/notification.service';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';
import {DocumentService} from "../documents/document.service";
import {Banque} from "../_models/banque";
import {BanqueService} from "../banque/banque.service";
import {UserService} from "../_services/user.service";
import {ConfigService} from "../config/config.service";
import {TransactionService} from "../transaction/transaction .service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.css'],
  animations: [
    trigger('cardemail', [
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
    trigger('carduser', [
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
        animate('0.3s 0.25s ease-out')
      ])
    ]),
    trigger('card2014sales', [
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
        animate('0.3s 0.5s ease-out')
      ])
    ]),
    trigger('cardtasks', [
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
        animate('0.3s 0.75s ease-out')
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  public data :any ;
  public users : number ;
  public transactions : any ;
  public budgets : any ;
  public banques : any ;



  constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService
    ,private banqueService:BanqueService,private userService:UserService,private configService:ConfigService
  ,private transactionService :TransactionService) { }

  public ngOnInit() {
    this.navbarTitleService.updateTitle('Dashboard');

    this.notificationService.notify(new NotificationOptions({
      message: 'Welcome to <b>Devstriker</b> - BEYOND ALL YOUR EXPECTATIONS',
      icon: 'pe-7s-home'
    }));

    var user=JSON.parse(localStorage.getItem("currentUser"));
    // Retrieve banks from the API
    this.banqueService.getbycompany(user.company).subscribe(banques => {
      this.banques = banques.length;
    });
    this.userService.getBycompany(user.company)
      .subscribe(
        data => {
          this.users = data.length ;
        });
    this.configService.getAll().subscribe(budgets => {
      this.budgets = budgets.length;
    });

    this.transactionService.getAllTransactions(user.company).subscribe(transactions => {
      this.transactions=transactions.length ;
    });
    }


   }
