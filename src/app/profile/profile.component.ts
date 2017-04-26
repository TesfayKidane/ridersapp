import { Component, OnInit } from '@angular/core';
import {Auth} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile;
  // user;
  constructor(private router: Router, private auth: Auth, private userService: UserService) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.profile._id = this.profile.email;
    this.profile.token = localStorage.getItem('id_token');
    this.userService.postUser(this.profile)
      .subscribe(
        user => { console.log('user added'); },
        err => {console.log(err); }
      );
  }

  ngOnInit() {
  }

}
