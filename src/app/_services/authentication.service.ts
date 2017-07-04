import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';;

@Injectable()
export class AuthenticationService {

    constructor(private http: Http,private localStorage: LocalStorageService) { }

    login(username: string, password: string) {
        var user1 ={"username":"","password":""};
          console.log("hello from authentificaton Service");
          user1.password=password;
          user1.username=username;
      //noinspection TypeScriptValidateTypes
        return this.http.post('http://localhost:3000/user/authenticate', user1)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                console.log(user);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }).catch(this.handleError);
}

private handleError(error: any): Promise<any>
{
  console.error(error); // for demo purposes only
  return Promise.reject(error.message || error);
}

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
