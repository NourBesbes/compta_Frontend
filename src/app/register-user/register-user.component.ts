import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { LocalStorageService } from 'angular-2-local-storage';
import { AlertService, UserService,CompanyService } from '../_services/index';
import {Company} from "../_models/company";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  loading = false;
  registerC=false;

  constructor(
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private companyService: CompanyService,
    private changeDetectorRef: ChangeDetectorRef) { }

  model:any = {username:'',password:'',imagePath:'',lastName:'',firstName:'',email:'',company:'',role:''};
company:Company;

  public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];


  ngOnInit() {
    console.log("detail from  componeent");
    this.route.params.switchMap((params:Params) => this.companyService.getCompany(params['_id']))
      .subscribe((company : Company)=>{this.company = company;
        console.log(this.company);
    localStorage.setItem('currentCompany', JSON.stringify(this.company));});

  }



  sleep(seconds)
  {
    var e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {}
  }
  register() {
    var compani = JSON.parse(localStorage.getItem("currentCompany"));

          this.model.company=compani._id;
          this.model.role="user";
          this.userService.create(this.model)
            .subscribe(
              data => {

                if (data.success==false){
                  this.alertService.error(data.msg);
                  this.loading = false;
                }
                else
                { this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);}
              },
              error => {
                this.alertService.error(error);
                this.loading = false;
              });

      localStorage.removeItem('currentCompany');

  }


  fileChange(input){
    this.readFiles(input.files);
  }

  readFile(file, reader, callback){
    reader.onload = () => {
      callback(reader.result);
      var url_elem = document.getElementById("image_url");
      this.model.imagePath=reader.result;
    }
    reader.readAsDataURL(file);
  }
  readFiles(files, index=0){
// Create the file reader
    let reader = new FileReader();
// If there is a file
    if(index in files){
// Start reading this file
      this.readFile(files[index], reader, (result) =>{
// Create an img element and add the image file data to it
        var img = document.createElement("img");
        img.src = result;
// Send this img to the resize function (and wait for callback)
        this.resize(img, 50, 100, (resized_jpeg, before, after)=>{
// For debugging (size in bytes before and after)
          this.debug_size_before.push(before);
          this.debug_size_after.push(after);
// Add the resized jpeg img source to a list for preview
// This is also the file you want to upload. (either as a
// base64 string or img.src = resized_jpeg if you prefer a file).
          this.file_srcs.push(resized_jpeg);
// Read the next file;
          this.readFiles(files, index+1);
        });
      });
    }
    else
    {
// When all files are done This forces a change detection
      this.changeDetectorRef.detectChanges();
    }
  }

  resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, callback){
// This will wait until the img is loaded before calling this function
    return img.onload = () => {
// Get the images current width and height
      var width = img.width;
      var height = img.height;
// Set the WxH to fit the Max values (but maintain proportions)
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

// create a canvas object
      var canvas = document.createElement("canvas");

// Set the canvas to the new calculated dimensions
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0,  width, height);

// Get this encoded as a jpeg
// IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg');

// callback with the results
      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }
}
