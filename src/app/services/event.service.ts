import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {EventModel} from '../models/EventModel';
import {Auth} from './auth.service';
@Injectable()
export class EventService {
  eventsRes: Object;
  token = '';
  private ridersapiUrl = 'http://127.0.0.1:9000/';
  constructor(public http: Http, public auth: Auth) {
    this.token = localStorage.getItem('id_token');
    this.token = this.token === null ? null : this.token.toString();
  }

  getEventById(id: string): Observable<Object> {
    const  url = this.ridersapiUrl + 'events/' + id;
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization' , this.token.toString());
    const options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
                .map((res: Response) => {
                 return res.json();
    })
    .catch((err: any) => Observable.throw('Error fetching data from ridersapi'));
  }

  postEvent(body: Object): Observable<EventModel[]> {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization' , this.token);
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.ridersapiUrl + 'events/addevent/', bodyString, options)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));
  }

  getEvents(): Observable<Object> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization' , this.token.toString());
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.ridersapiUrl + 'events/', options)
                    .map((res: Response) => {
                        return res.json();
                      })
                    .catch((err: any) => Observable.throw('Error fetching data from ridersapi'));

  }

}
