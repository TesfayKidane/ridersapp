import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ClubModel } from '../models/ClubModel';

@Injectable()
export class ClubService {
  private ridersapiUrl = 'http://127.0.0.1:9000/';
  constructor(public http: Http) { }

  postClub(body: Object): Observable<ClubModel[]> {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    console.log('Posted object:' + bodyString);
    return this.http.post(this.ridersapiUrl + 'clubs/addclub/', bodyString, options)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));
  }

  getClubs() {
    return this.http.get(this.ridersapiUrl + 'clubs/');
  }

  getClubById( club_id ) {
    return this.http.get(this.ridersapiUrl + 'clubs/' + club_id );
  }
}
