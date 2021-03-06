import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../services/chat.service';
import * as io from 'socket.io-client';
import {SharedService} from '../services/SharedService';

import {Auth} from '../services/auth.service';

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
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  socket;

  constructor(public chatdb: ChatService, private auth: Auth) {
    this.socket = chatdb.getSocket();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
  ngOnInit() {
    this.socket.on('connect', function(){
      this.socket.emit('authenticate', {headers: {
        token: localStorage.getItem('id_token'),
        email: JSON.parse(localStorage.getItem('profile')).email}
      }); }.bind(this));
    this.chatdb.getUsers().subscribe(s =>  {
      this.users = s.json();
      for( const key in this.users ) {
        this.userActions[this.users[key]._id] = '';
      }
    });
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      this.joined = true;
    }
    this.socket.on('new-message', function (message) {
      this.messages.push(message);
      this.scrollToBottom();
    }.bind(this));
    this.socket.on('heistyping', function (data) {
      this.userActions[data.message.hash] = 'typing...';
      this.clearLater(data.message.hash);
    }.bind(this));
    this.scrollToBottom();
  }
  clearLater(fromId) {
    setTimeout((p1) => {
      this.userActions[p1] = '';
    }, 1500, fromId);
  }
  onUserClick(user) {
    this.activeUserId = user._id;
    this.activeUserName = user.name;
    this.chatdb.getUserMessages(this.activeUserId).subscribe(s => {
      this.messages = s.json();
    });
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
    this.newMessage = '';
  }
  onSearch(fullname: string,  value: string ) {
    return fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0  || value.length === 0;
  }
}
