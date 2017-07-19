/**
 * Created by nour on 7/19/17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userpipe' })
export class UserPipe implements PipeTransform {
  transform(users: any, searchText: any): any {
    if(searchText == null) return users;

    return users.filter(function(user){
      return user.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
