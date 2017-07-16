///<reference path="../../../node_modules/rxjs/add/operator/map.d.ts"/>
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../_models/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class UserService {
    constructor(private http: Http, private localStorage: LocalStorageService) { }
endpoint_url='http://localhost:3000/user/findUser';
update_url='http://localhost:3000/user/update';
  role_url='http://localhost:3000/user/findUserRole';
    getAll()
    {
        //noinspection TypeScriptValidateTypes
      return this.http.get('http://localhost:3000/user/getall')
          .map((response: Response) => response.json());
    }

getByUsername(username:string)
    {
      const url=`${this.endpoint_url}/${username}`;
      console.log(url);
      return this.http.
      get(url)
        .map((response: Response) =>response.json());
    }
  getRoleByUsername(username:string)
  {
    const url=`${this.role_url}/${username}`;
    console.log(url);
    return this.http.
    get(url)
      .map((response: Response) =>response.json());
  }
    create(user: User)
    {
        console.log("Hello From UserService; Méthode Create");
        console.log(user);
        //noinspection TypeScriptValidateTypes
      return this.http.post('http://localhost:3000/user/signup1', user).
        map((response: Response) =>response.json());
    }

    update(user: any) {
      //noinspection TypeScriptValidateTypes
         const url=`${this.update_url}/${user.username}`;
      console.log(url);
      return this.http.
      put(url,user).
        map((response: Response) => response.json());

    }

    delete(id: number) {
      //noinspection TypeScriptValidateTypes
        return this.http.delete('/api/users/' + id, this.jwt()).map((
          response: Response) => response.json());
    }

  addUser(model:any)
  {
    return this.http.post("http://localhost:3000/user/addusers",model).
    map((response: Response) =>response.json());
  }


    // private helper methods

   private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

private jwta(UserRegister: User) {
let _body = JSON.stringify(UserRegister);
let headers = new Headers({ 'Content-Type': 'application/json' });

return new RequestOptions({
          headers: headers,
          body: _body });
}

}
