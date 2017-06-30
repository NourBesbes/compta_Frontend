/**
 * Created by nour on 6/23/17.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
        formData.append("uploads[]", files[i], files[i].name);
      }

      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }



}
