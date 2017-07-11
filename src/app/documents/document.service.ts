/**
 * Created by nour on 7/10/17.
 */
import { Injectable } from '@angular/core';
import {Http Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DocumentService {

  constructor(private http: Http,) { }


  getExerciceComptable(date:string)
  {   var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("Hello From DocumentService; Méthode Ex");
    //noinspection TypeScriptValidateTypes
    return this.http.post('http://localhost:3000/transaction/getExComp',  JSON.stringify(date), {headers: headers}).
    map((res) =>res.json());
  }



}
