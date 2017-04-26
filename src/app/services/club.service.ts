import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ClubModel } from '../models/ClubModel';
import {SharedService} from "./SharedService";

@Injectable()
export class ClubService {
  private ridersapiUrl = SharedService.API_URL;
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
  getNearbyClubs(lat, lng) {
    return this.http.get(SharedService.API_URL + 'getnearrby?lat=' + lat + '&lng=' + lng);
  }

  getClubById( club_id ) {
    return this.http.get(this.ridersapiUrl + 'clubs/byId/' + club_id )
      .map((res: Response) => {
      return res.json();
    }).catch((err: any) => Observable.throw('Error fetching data from ridersapi'));
  }

  pushAnnounceId( updateObject) {
    this.http.post(this.ridersapiUrl + 'clubs/addAnnounce', updateObject );
  }
}
