import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {SharedService} from './SharedService';
import * as io from 'socket.io-client';
@Injectable()
export class ChatService {
  socket;
  constructor(private http: Http) {
    this.socket = io(SharedService.API_URL);
  }

  getChatByRoom(room) {
    return new Promise((resolve, reject) => {
      this.http.get(SharedService.API_CHAT + room, SharedService.API_REQUEST_OPTIONS())
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
      this.http.post(SharedService.API_CHAT, data, SharedService.API_REQUEST_OPTIONS())
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUsers() {
    return this.http.get(SharedService.API_CHAT + 'users', SharedService.API_REQUEST_OPTIONS());
  }

  getUserMessages(userId: number) {
    return this.http.get(SharedService.API_CHAT + 'messages/' + userId, SharedService.API_REQUEST_OPTIONS());
  }

  sendUserMessage(msg) {
    return this.http.post(SharedService.API_CHAT, msg, SharedService.API_REQUEST_OPTIONS());
  }

  getSocket() {
    return this.socket;
  }
}
