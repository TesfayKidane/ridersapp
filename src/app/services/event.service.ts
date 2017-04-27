import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {EventModel} from '../models/EventModel';
import {SharedService} from './SharedService';
@Injectable()
export class EventService {
  constructor(public http: Http) {
  }

  getEventById(id: string){
    const  url = SharedService.API_URL + 'events/byId/' + id;
    return this.http.get(url, SharedService.API_REQUEST_OPTIONS());
  }

  postEvent(body: Object): Observable<EventModel[]> {
    return this.http.post(SharedService.API_ADD_EVENT, body, SharedService.API_REQUEST_OPTIONS())
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));
  }
  getEvents(clubId): Observable<Object> {
    if (clubId) {
      return this.http.get(SharedService.API_URL + 'events/byClub/' + clubId, SharedService.API_REQUEST_OPTIONS())
        .map((res: Response) => {
          return res.json();
        })
        .catch((err: any) => Observable.throw('Error fetching data from ridersapi'));
    }
    return this.http.get(SharedService.API_URL + 'events/', SharedService.API_REQUEST_OPTIONS())
                    .map((res: Response) => {
                        return res.json();
                      })
                    .catch((err: any) => Observable.throw('Error fetching data from ridersapi'));
  }

  addUserToEvent(eventId: any, userId: any): Observable<EventModel[]> {
    const requestBody = {'eventId' : eventId, 'userId': userId};
    return this.http.post(SharedService.API_ADD_USER_TO_EVENT, requestBody, SharedService.API_REQUEST_OPTIONS())
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));

  }
}
