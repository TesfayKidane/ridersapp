import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SharedService} from './SharedService';

@Injectable()
export class UserService {
  constructor(public http: Http) {
  }
  postUser(body: Object): Observable<Object>  {
    return this.http.post(SharedService.API_USER_ADD, body, SharedService.API_REQUEST_OPTIONS())
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));
  }
}
