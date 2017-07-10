/**
 * Created by nour on 6/23/17.
 */

import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class TransactionService {

  constructor(private http: Http) { }

  // Get all transactions from the API
  getAllTransactions() {
    return this.http.get('http://localhost:3000/transaction/getAll')
      .map(res => res.json());
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i < files.length; i++) {
        console.log("hellllo");
        formData.append("uploads[]", files[i], files[i].name);
      }

      xhr.open("POST", url, true);
      xhr.send(formData);
    })
  }

  public delete(id:string){
    console.log("Hello From TransactionService; Méthode Delete")
    let options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }),
      method: RequestMethod.Delete
    });
    return this.http.delete(`http://localhost:3000/transaction/delete/${id}`,options)
      .map((res) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }



}
