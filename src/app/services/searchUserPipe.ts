import {Pipe, PipeTransform} from '@angular/core';
/**
 * Created by sherxon on 4/25/17.
 */
@Pipe({
  name: 'searchu',
  pure: false
})
export class SearchUserPipe implements PipeTransform {
  users;
  newUsers = [];
  transform(posts, value) {
    this.users = posts;
    this.newUsers = [];
    this.search(value);
    return this.newUsers;
  }

  search(value: string ) {
    for ( const key in this.users) {
      const fullname  = this.users[key].firstName + ' ' + this.users[key].lastName;
      if ( fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0  || value.length === 0) {
        this.newUsers.push(this.users[key]);
      }
    }
  }
}
