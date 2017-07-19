import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';
import { UserService } from '../_services/index';
import {User} from "../_models/user";
import {CompanyService} from "../_services/company.service";
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

  public currentUser:any;
  public user:any;
  public  user1 ={"username":"","password":"","email":"", "first_name":"","last_name":"","image":"","company":"","name":""};
  model:any = {_id:'',username:'',password:'',imagePath:'',last_name:'',first_name:'',email:'',company:'',role:''};
  constructor(private navbarTitleService: NavbarTitleService,private userService:UserService,private companyService:CompanyService) { }

  public ngOnInit() {
    this.navbarTitleService.updateTitle('User Profile');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getCurrentUser();

  }
  public onSubmit() {
    console.log('Submitting values', this.user1);
     this.userService.update(this.user1).subscribe((data) => { this.user = data;
       console.log('user', this.user);
     this.getCurrentUser();
     });
  }
  public getCurrentUser()
  {
    this.userService.getByUsername(this.currentUser.username).subscribe((data) => { this.user = data;

        this.user1.username=this.user.username;
        this.user1.password=this.user.password;
        this.user1.email=this.user.email;
        this.user1.first_name=this.user.first_name;
        this.user1.last_name=this.user.last_name;
        this.user1.image=this.user.imagePath;
        this.user1.company=this.currentUser.company;
      if(this.currentUser.role=="superAdmin")
      {
        this.companyService.getCompany(this.currentUser.company).subscribe(data => this.user1.name=data.name)

      }
      else
        this.user1.name=this.user.company.name;
        console.log(this.user1);
 });
  }
}
