import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AnnouncementModel} from '../models/AnnouncementModel';
import {SharedService} from './SharedService';

@Injectable()
export class AnnouncementService {
  private ridersapiUrl = SharedService.API_URL;
  constructor(public http: Http) { }

  postAnnouncement(body: Object): Observable<AnnouncementModel[]> {
    const bodyString = JSON.stringify(body);
    return this.http.post(this.ridersapiUrl + 'announce/addannounce/', bodyString, SharedService.API_REQUEST_OPTIONS())
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));
  }

  getAnnouncement(clubId): Observable<Object> {
    if ( clubId ) {
      return this.http.get(this.ridersapiUrl + 'announce/byClub/' + clubId, SharedService.API_REQUEST_OPTIONS())
        .map((res: Response) => {
          return res.json();
        })
        .catch((err: any) => Observable.throw('Error fetching data from ridersapi'));
    }
  }
}
