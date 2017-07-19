/**
 * Created by nour on 7/19/17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'transactionpipe' })
export class TransactionPipe implements PipeTransform {
  transform(transactions: any, searchText: any): any {
    if(searchText == null) return transactions;

    return transactions.filter(function(transaction){
      return transaction.Libelle.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
