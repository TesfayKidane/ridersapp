import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ClubModel } from '../models/ClubModel';
import {SharedService} from './SharedService';

@Injectable()
export class ClubService {
  private ridersapiUrl = SharedService.API_URL;
  options;
  constructor(public http: Http) {
  }

  postClub(body: Object): Observable<ClubModel[]> {
    const bodyString = JSON.stringify(body);
    return this.http.post(this.ridersapiUrl + 'clubs/addclub/', bodyString, SharedService.API_REQUEST_OPTIONS())
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));
  }

  getClubs() {
    return this.http.get(this.ridersapiUrl + 'clubs/', SharedService.API_REQUEST_OPTIONS());
  }
  getNearbyClubs(lat, lng) {
    return this.http.get(SharedService.API_URL + 'clubs/getnearby?lat=' + lat + '&lng=' + lng, SharedService.API_REQUEST_OPTIONS());
  }

  getClubById( club_id ) {
     return this.http.get(this.ridersapiUrl + 'clubs/byId/' + club_id, SharedService.API_REQUEST_OPTIONS())
      .map((res: Response) => {
      return res.json();
    }).catch((err: any) => Observable.throw('Error fetching data from ridersapi'));
  }

  pushAnnounceId( updateObject) {
    this.http.post(this.ridersapiUrl + 'clubs/addAnnounce', updateObject );
  }
}
