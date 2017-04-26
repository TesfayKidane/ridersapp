import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {SharedService} from './SharedService';

@Injectable()
export class ChatService {

  constructor(private http: Http) { }

  getChatByRoom(room) {
    return new Promise((resolve, reject) => {
      this.http.get(SharedService.API_CHAT + room)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
      this.http.post(SharedService.API_CHAT, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUsers() {
    return this.http.get(SharedService.API_CHAT + 'users');
  }

  getUserMessages(userId: number) {
    return this.http.get(SharedService.API_CHAT + 'messages/' + userId);
  }

  sendUserMessage(msg) {
    return this.http.post(SharedService.API_CHAT, msg);
  }
}
