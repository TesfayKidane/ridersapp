import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SharedService} from './SharedService';

@Injectable()
export class UserService {
  constructor(public http: Http) {
  }

  // var options = { method: 'POST',
  // url: 'https://bikeriders.auth0.com/oauth/token',
  // headers: { 'content-type': 'application/json' },
  // postBody = '{"client_id":"zGMhC1ZDySXuF9by1TFRMT8cdixqFJtl","client_secret":"2hiseyWC1fBlWAauawyHM_cSH2sHn9f4w9hzg5r9X-6E5750Nu_wsrbPqufx7bDw","audience":"http://localhost:9000","grant_type":"client_credentials"}' ;
  // postToGetAPIAccessToken(){
  //   const url = 'https://bikeriders.auth0.com/oauth/token';
  //   return this.http.post(url, this.postBody, SharedService.API_JSON_HEADER())
  //     .map((res: Response) => {res.json())
  //     .catch((err: any) => Observable.throw('Error Posting to Server'));
  // }
  postUser(body: Object): Observable<Object>  {
       return this.http.post(SharedService.API_USER_ADD, body, SharedService.API_REQUEST_OPTIONS())
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));
  }

  getLoggedInUser() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    profile._id = profile.email;
    profile.token = localStorage.getItem('id_token');
    return profile;
  }

  getUserById(id) {
    return this.http.get(SharedService.API_URL_USERS + 'byId/' + id, SharedService.API_REQUEST_OPTIONS())
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw('Error Posting to Server'));
  }
}
