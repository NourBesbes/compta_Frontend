/**
 * Created by nour on 7/13/17.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { Banque } from '../_models/banque';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfigService {

  constructor(private http: Http) {
  }

  getAll(id) {
    return this.http.get('http://localhost:3000/budget/listall/'+id)
      .map(res => res.json());
  }
  getSousBudget(name) {
    return this.http.get('http://localhost:3000/budget/getSousBudget/'+name)
      .map(res => res.json());
  }
  public delete(id:string){
    console.log("Hello From ConfigService; Méthode Delete")
    let options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }),
      method: RequestMethod.Delete
    });
    return this.http.delete(`http://localhost:3000/budget/deletebudget/${id}`,options)
      .map((res) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  add(budget,id)
  {   var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("Hello From ConfigService; Méthode Add");
    console.log(budget);
    //noinspection TypeScriptValidateTypes
    return this.http.post('http://localhost:3000/budget/addbudget/'+id,  JSON.stringify(budget), {headers: headers}).
    map((res) =>res.json());
  }
  addSousBudget(budget)
  {   var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("Hello From ConfigService; Méthode Add sous budget");

    return this.http.post('http://localhost:3000/budget/addsousbudget/'+budget._id,  JSON.stringify(budget), {headers: headers}).
    map((res) =>res.json());
  }
  public update(budget){
    console.log("Hello From ConfigService; Méthode Update");

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/budget/update/'+budget._id, JSON.stringify(budget), {headers: headers})
      .map(res => res.json());
  }

  endpoint_url='http://localhost:3000/budget/deletesousbudget';
  public deleteSousBudget(budget) {
    console.log("Hello From ConfigService; Méthode Delete Sous Budget");
    const url=`${this.endpoint_url}/${budget.id}`;
    console.log(url);
    return this.http.post('http://localhost:3000/budget/deletesousbudget/'+budget.id,  budget).
    map((res) =>res.json());

  }

}
