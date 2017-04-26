import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ClubModel } from '../models/ClubModel';
import {Auth} from './auth.service';
import {SharedService} from "./SharedService";

@Injectable()
export class ClubService {
  private ridersapiUrl = 'http://127.0.0.1:9000/';
  options;
  constructor(public http: Http) {
    let token = localStorage.getItem('id_token');
    token = token === null ? null : token.toString();

    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization' , token);
    this.options = new RequestOptions({headers: headers});
  }

  postClub(body: Object): Observable<ClubModel[]> {
    const bodyString = JSON.stringify(body);
    console.log('Posted object:' + bodyString);
    return this.http.post(this.ridersapiUrl + 'clubs/addclub/', bodyString, SharedService.API_REQUEST_OPTIONS())
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));
  }

  getClubs() {
    return this.http.get(this.ridersapiUrl + 'clubs/', SharedService.API_REQUEST_OPTIONS());
  }

  getClubById( club_id ) {
     return this.http.get(this.ridersapiUrl + 'clubs/' + club_id, SharedService.API_REQUEST_OPTIONS());
  }
}
