import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';
import { UserService } from '../_services/index';
import {User} from "../_models/user";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  animations: [
    trigger('carduserprofile', [
      state('*', style({
        '-ms-transform': 'translate3D(0px, 0px, 0px)',
        '-webkit-transform': 'translate3D(0px, 0px, 0px)',
        '-moz-transform': 'translate3D(0px, 0px, 0px)',
        '-o-transform': 'translate3D(0px, 0px, 0px)',
        transform: 'translate3D(0px, 0px, 0px)',
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0,
          '-ms-transform': 'translate3D(0px, 150px, 0px)',
          '-webkit-transform': 'translate3D(0px, 150px, 0px)',
          '-moz-transform': 'translate3D(0px, 150px, 0px)',
          '-o-transform': 'translate3D(0px, 150px, 0px)',
          transform: 'translate3D(0px, 150px, 0px)',
        }),
        animate('0.3s 0s ease-out'),
      ])
    ]),
    trigger('cardprofile', [
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
    ])
  ]
})
export class UserComponent implements OnInit {
  public formData: any;
  public userAbout: string;
  public currentUser:any;
  public user:any;
  constructor(private navbarTitleService: NavbarTitleService,private userService:UserService) { }

  public ngOnInit() {
    this.navbarTitleService.updateTitle('User Profile');
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    this.getCurrentUser();
    this.userAbout = '"Lamborghini Mercy <br>Your chick she so thirsty <br>I\'m in that two seat Lambo"';
    this.formData = {
      username: this.currentUser.username,
      email: this.currentUser.email,
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName


    };

  }

  public onSubmit() {
    console.log('Submitting values', this.formData);
  }

  public getCurrentUser()
  {
    this.userService.getByUsername(this.currentUser).subscribe(data => { this.user = data; });
    console.log(this.user);
  }
}
