import {Component, ElementRef, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';
import * as io from 'socket.io-client';
import {SharedService} from "../services/SharedService";
import {current} from "codelyzer/util/syntaxKind";

@Component({
  selector: 'app-web-chat',
  templateUrl: './web-chat.component.html',
  styleUrls: ['./web-chat.component.css']
})
export class WebChatComponent implements OnInit {
  users;
  userActions = {};
  messages;
  newMessage = '';
  joined = false;
  activeUserId;
  activeUserName = '';
  currentUser = {_id: '1'};
  socket = io(SharedService.API_URL);
  constructor(public chatdb: ChatService) { }

  ngOnInit() {
    this.chatdb.getUsers().subscribe(s =>  {
      this.users = s.json();
      console.log(s.json());
      for (const key in this.users) {
        this.userActions[this.users[key]._id + '#' + this.currentUser._id] = '';
      }
      console.log(this.userActions);
    });
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      console.log('ngInit');
      this.joined = true;
    }
    this.socket.on('new-message', function (data) {
      if ( data.message.toId === this.currentUser._id ) {
        this.messages.push(data.message);
      }
    }.bind(this));
    this.socket.on('heistyping', function (data) {
      console.log(data);
      console.log(this.userActions);
      this.userActions[data.message.hash] = 'typing...';
      this.clearLater(data.message.hash);
    }.bind(this));
  }
  clearLater(fromId) {
    setTimeout((p1) => {
      this.userActions[p1] = '';
    }, 1500, fromId);
  }
  onUserClick(user) {
    this.activeUserId = user._id;
    this.activeUserName = user.firstName + ' ' + user.lastName;
    this.chatdb.getUserMessages(this.activeUserId).subscribe(s => this.messages = s.json());
  }
  onTyping() {
    this.socket.emit('iamtyping', {toId: this.activeUserId });
  }
  onMessageSend(newMessage) {
    console.log(newMessage + ' input');
    if (newMessage.length === 0) {
      return;
    }
    this.messages.toId = this.activeUserId;
    const msg = {msg: newMessage, toId: this.activeUserId};
    this.chatdb.sendUserMessage(msg).subscribe(s => console.log(s.json()));
    this.messages.push(msg);
    this.socket.emit('save-message', msg);
    this.newMessage = '';
  }
  onSearch(fullname: string,  value: string ) {
    console.log(value);
    return fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0  || value.length === 0;
  }
}
