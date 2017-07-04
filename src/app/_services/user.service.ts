///<reference path="../../../node_modules/rxjs/add/operator/map.d.ts"/>
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../_models/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
@Injectable()
export class UserService {
    constructor(private http: Http, private localStorage: LocalStorageService) { }

    getAll()
    {
        //noinspection TypeScriptValidateTypes
      return this.http.get('http://localhost:3000/user/getall')
          .map((response: Response) => response.json());
    }

    getByUsername(currentUser:any)
    { console.log("Hello From UserService==>getByUsername",currentUser);
        //noinspection TypeScriptValidateTypes
      return this.http.post('http://localhost:3000/user/findUser' , currentUser, this.jwt()).
        map((response: Response) => response.json());
    }

    create(user: User)
    {
        console.log("Hello From UserService; Méthode Create");
        console.log(user);
        //noinspection TypeScriptValidateTypes
      return this.http.post('http://localhost:3000/user/signup1', user, this.jwt()).
        map((response: Response) =>response.json());
    }

    update(user: User) {
      //noinspection TypeScriptValidateTypes
        return this.http.put('/api/users/' + user.id, user, this.jwt()).
        map((response: Response) => response.json());

    }

    delete(id: number) {
      //noinspection TypeScriptValidateTypes
        return this.http.delete('/api/users/' + id, this.jwt()).map((
          response: Response) => response.json());
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
