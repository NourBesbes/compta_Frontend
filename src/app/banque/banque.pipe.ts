/**
 * Created by nour on 7/19/17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'banquepipe' })
export class BanquePipe implements PipeTransform {
  transform(banques: any, searchText: any): any {
    if(searchText == null) return banques;

    return banques.filter(function(banque){
      return banque.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
