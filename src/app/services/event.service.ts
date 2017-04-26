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

  getEventById(id: string): Observable<Object> {
    return this.http.get(SharedService.API_EVENTS + id, SharedService.API_REQUEST_OPTIONS())
                .map((res: Response) => {
                 return res.json();
    })
    .catch((err: any) => Observable.throw('Error fetching data from ridersapi'));
  }

  postEvent(body: Object): Observable<EventModel[]> {
    // const bodyString = JSON.stringify(body);
    return this.http.post(SharedService.API_ADD_EVENT, body, SharedService.API_REQUEST_OPTIONS())
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));
  }

  getEvents(): Observable<Object> {
    return this.http.get(SharedService.API_EVENTS, SharedService.API_REQUEST_OPTIONS())
                    .map((res: Response) => {
                        return res.json();
                      })
                    .catch((err: any) => Observable.throw('Error fetching data from ridersapi'));

  }
}
