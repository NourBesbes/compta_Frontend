import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';
import {UserService} from "../_services/user.service";
import {NotificationService, NotificationType, NotificationOptions} from '../lbd/services/notification.service';
import {CompanyService} from "../_services/company.service";
import {User} from "../_models/user";
import {UpdateAdminModal} from "./updateform-modal";
import {overlayConfigFactory, Modal} from "angular2-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {UserPipe} from "./admin.pipe";

@Component({
  selector: 'app-icons',
  templateUrl: 'admin.component.html',
  pipes:[UserPipe],
  styleUrls: ['admin.component.css'],
  animations: [
    trigger('cardicons', [
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
export class AdminComponent implements OnInit {
model:any={to:'',text:''};
  public iconClasses: string[];
users:any[];

  constructor(private navbarTitleService: NavbarTitleService,
              private userService:UserService,
              private notificationService: NotificationService,
              private companyService:CompanyService,public modal: Modal) { }

  deleteUser(user:any)
  {
    if (confirm('Are you sure you want to delete ' + user.username)) {

    this.userService.delete(user).subscribe(data => {
      console.log(data);
      const type = Math.floor((Math.random() * 4) + 1);
      this.notificationService.notify(new NotificationOptions({
        message:  data.username +' a été supprimé',
        icon: 'pe-7s-trash',
        type: <NotificationType>(type),
        from: 'top',
        align: 'right'
      }));

      this.userService.getBycompany(user.company)
        .subscribe(
          data => {
            this.users = [];
            this.users=data
          });
    });
  }
  }

  SendMail()
  {var store = JSON.parse(localStorage.getItem("currentUser"));
    this.model.text="http://localhost:4200/registerUser/" +store.company ;
    console.log(this.model);
    this.userService.addUser(this.model).subscribe(data => {console.log(data);
      this.notificationService.notify(new NotificationOptions({
        message: 'Votre mail a été envoyé!',
        icon: 'pe-7s-delete-user',
        type: NotificationType.Success,
        from: 'top',
        align: 'right'
      }))
      ;});
  }

  getByCompany()
  {var user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user);
   // this.userService.getByUsername(user.username).subscribe(
    //  data => {
       // console.log(data);
        this.userService.getBycompany(user.company)
          .subscribe(
            data => { this.users=data

            });

   //   });

  }
  Change()
{
  $('.a').on('click', function() {
    var $this = $(this);
    var $input = $('<input>', {
      value: $this.text(),

      type: 'text',
      blur: function() {
        $this.text(this.value);

      },
      keyup: function(e) {
        if (e.which === 13) $input.blur();
      }
    }).appendTo( $this.empty() ).focus();
  });
}

  Update(user:any)
  {
    this.userService.update(user).subscribe((data) => {

  console.log(data);

    });
  }
  public onClickUpdate(user:User) {
    return this.modal.open(UpdateAdminModal, overlayConfigFactory(user, BSModalContext)).then(res =>

      console.log(res)
    )
  }

  ngOnInit() {
    this.navbarTitleService.updateTitle('Administration');
  this.getByCompany();
  }
}
