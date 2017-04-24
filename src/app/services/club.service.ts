import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ClubService {

  private ridersapiUrl = 'http://127.0.0.1:9000/';
  constructor(public http: Http) { }

}
