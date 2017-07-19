import {Component, OnInit, trigger, transition, style, animate} from '@angular/core';
import {NotificationService, NotificationType, NotificationOptions} from '../lbd/services/notification.service';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';
import {BanqueService} from "./banque.service";
import { Banque } from '../_models/banque';
import { Http } from '@angular/http';
import { AlertService } from '../_services/index';
import { Modal ,BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {CustomModal} from './updateform-modal';
import {AddModal} from './addform-modal';
import {  overlayConfigFactory } from 'angular2-modal';
import { BanquePipe } from './banque.pipe';
@Component({
  selector: 'app-typography',
  templateUrl: 'banque.component.html',
  pipes: [BanquePipe]  ,
  styleUrls: ['banque.component.css'],
  animations: [
    trigger('cardtypography', [
      transition('void => *', [
        style({opacity: 0,
          '-ms-transform': 'translate3D(0px, 150px, 0px)',
          '-webkit-transform': 'translate3D(0px, 150px, 0px)',
          '-moz-transform': 'translate3D(0px, 150px, 0px)',
          '-o-transform': 'translate3D(0px, 150px, 0px)',
          transform: 'translate3D(0px, 150px, 0px)',
        }),
        animate('0.3s 0s ease-out', style({opacity: 1,
          '-ms-transform': 'translate3D(0px, 0px, 0px)',
          '-webkit-transform': 'translate3D(0px, px, 0px)',
          '-moz-transform': 'translate3D(0px, 0px, 0px)',
          '-o-transform': 'translate3D(0px, 0px, 0px)',
          transform: 'translate3D(0px, 0px, 0px)',
        }))
      ])
    ])
  ]
})

export class BanqueComponent implements OnInit {
  loading = false;
  banques: Banque[];
  searchText:string;
  model:any = {name:'',swift:'',IBAN:'',Banque:'',company:''};
  p: number = 1;

  constructor(private navbarTitleService: NavbarTitleService,private http: Http,private banqueService: BanqueService,

  private alertService: AlertService,public modal: Modal,private notificationService: NotificationService) { }

  public ngOnInit() {
    this.navbarTitleService.updateTitle('Banque');
    var user=JSON.parse(localStorage.getItem("currentUser"));
    // Retrieve banks from the API
    this.banqueService.getbycompany(user.company).subscribe(banques => {
      this.banques = banques;
    });

  }



 public deleteBanque(banque:Banque){
   if (confirm('Are you sure you want to delete ' + banque.name)) {

     var banques = this.banques;
     const type = Math.floor((Math.random() * 4) + 1);

     this.banqueService.delete(banque._id).subscribe(data => {
       var name=banque.name
       this.notificationService.notify(new NotificationOptions({
         message: 'Le compte bancaire a été supprimé',
         icon: 'pe-7s-trash',
         type: <NotificationType>(type),
         from: 'top',
         align: 'right'
       }));
       this.banqueService.getAll().subscribe(banques => {
         this.banques = banques;
       });

     });

   }

  }

  onClickUpdate(banque:Banque) {
    return this.modal.open(CustomModal,  overlayConfigFactory(banque, BSModalContext)).then(res=>

      console.log(res)
  )
  }
  onClickAdd(banque:Banque) {
    return this.modal.open(AddModal,  overlayConfigFactory(banque, BSModalContext))
  }


}
