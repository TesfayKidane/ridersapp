import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AnnouncementModel} from '../models/AnnouncementModel';

@Injectable()
export class AnnouncementService {
  private ridersapiUrl = 'http://127.0.0.1:9000/';
  constructor(public http: Http) { }

  postAnnouncement(body: Object): Observable<AnnouncementModel[]> {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.ridersapiUrl + 'announce/addannounce/', bodyString, options)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));
  }

  getAnnouncement(clubId): Observable<Object> {
    if ( clubId ) {
      return this.http.get(this.ridersapiUrl + 'announce/byClub/' + clubId)
        .map((res: Response) => {
          return res.json();
        })
        .catch((err: any) => Observable.throw('Error fetching data from ridersapi'));
    }
  }
}
