import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {UserService} from './user.service';
// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('38Ix505An88v5toZw1RS7pbE4l93BsXr', 'bikeriders.auth0.com', {});
  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult: any) => {
      this.lock.getProfile(authResult.idToken, function(err:any, profile:any){
          if (err) { throw new Error(err);
          }
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    // var profile ;
    // profile = JSON.parse(localStorage.getItem('profile'));
    // profile._id = profile.email;
    // profile.token = '';
    // // this.user = { _id : this.profile.email, name : 'Tesfay', token: this.profile.token};
    // // console.log(this.profile);
    // this.userService.postUser(profile)
    //   .subscribe(
    //     user => { console.log('user token removed added'); },
    //     err => {console.log(err); }
    //   );
    localStorage.removeItem('profile');
  }
}
