import { Component, OnInit } from '@angular/core';
import {ClubService} from '../../services/club.service';
import {Auth} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  clubs;
  profile;
  constructor(public clubService: ClubService, private auth: Auth, public userService: UserService) {
    this.profile = this.userService.getLoggedInUser();
    this.clubService.getClubs()
      .subscribe(
        club => {
            this.clubs = club.json();
            for ( const key in this.clubs ) {
              if (this.clubs[key].userIds.indexOf(this.profile._id) > -1) {
                this.clubs[key].joined = true;
              } else {
                this.clubs[key].joined = false;
              }
            }
          },
        err => {console.log(err); }
      );
  }

  ngOnInit() {
  }

  joinClub(club) {
    const clubId = club._id;
    this.clubService.joinClubs(clubId, this.profile._id)
      .subscribe(
        rclub => {
          club.joined = true;
          club.userIds.push(this.profile._id);
        },
        err => {console.log(err); }
      );
  }
}
