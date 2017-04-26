import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Auth} from './auth.service';

@Injectable()
export class UserService {
  private ridersapiUrl = 'http://127.0.0.1:9000/';
  token = '';
  constructor(public http: Http, public auth: Auth) {
  this.token = localStorage.getItem('id_token');
  this.token = this.token === null ? null : this.token.toString();
}

postUser(body: Object): Observable<Object>  {
  const headers = new Headers({'Content-Type': 'application/json'});
  headers.append('Authorization' , this.token.toString());
  const options = new RequestOptions({headers: headers});
  return this.http.post(this.ridersapiUrl + 'users/adduser/', body, options)
    .map((res: Response) => res.json())
    .catch((err: any) => Observable.throw('Error Posting to Server'));
}
}
