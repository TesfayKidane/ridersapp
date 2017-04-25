import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clubPipe'
})
export class ClubPipe implements PipeTransform {

  transform(posts, value: string): any {
    const newarr = [];
    const searchValue = value.toLowerCase();
    for ( const key in posts) {
      if (
        posts[key].clubName.toLowerCase().indexOf(searchValue) !== -1 ||
        posts[key].clubCity.toLowerCase().indexOf(searchValue) !== -1 ||
        posts[key].clubState.toLowerCase().indexOf(searchValue) !== -1 ||
        posts[key].clubPostCode.toString().toLowerCase().indexOf(searchValue) !== -1 ||
        value.length === 0 ) {
        newarr.push(posts[key]);
      }
    }
    return newarr;
  }

}
