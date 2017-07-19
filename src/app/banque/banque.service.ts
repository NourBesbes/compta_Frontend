/**
 * Created by nour on 7/4/17.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { Banque } from '../_models/banque';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BanqueService {

  constructor(private http: Http) { }

  getAll() {
    return this.http.get('http://localhost:3000/banque/listall')
      .map(res => res.json());
  }


  getbycompany(id:string){
    return this.http.get(`http://localhost:3000/banque/getbycompany/${id}`)
      .map((res) => res.json())
  }

  add(banque)
  {   var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("Hello From BanqueService; Méthode Add");
    console.log(banque);
    //noinspection TypeScriptValidateTypes
    return this.http.post('http://localhost:3000/banque/add',  banque, {headers: headers}).
    map((res) =>res.json());
  }

  public delete(id:string){
    console.log("Hello From BanqueService; Méthode Delete")
    let options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }),
       method: RequestMethod.Delete
    });
    return this.http.delete(`http://localhost:3000/banque/delete/${id}`,options)
      .map((res) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public update(banque){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/banque/update/'+banque._id, JSON.stringify(banque), {headers: headers})
      .map(res => res.json());
  }

}
