import {Component, OnInit, trigger, state, style, transition, animate, Input} from '@angular/core';
import {NotificationService, NotificationType, NotificationOptions} from '../lbd/services/notification.service';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { Daterangepicker } from 'ng2-daterangepicker';

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
  options: NgDateRangePickerOptions;
  public x:string ;

  constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

  public ngOnInit() {
    this.navbarTitleService.updateTitle('Documents Comptable');
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yMd',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 1

    };
  }
  public getstartdate(date:string)
  {
    this.x=date.split("-")[0];
    console.log(this.x);
    return(date)
  }


}
