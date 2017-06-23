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
}
