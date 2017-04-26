import { Component, OnInit } from '@angular/core';
import {ClubService} from '../../services/club.service';
import {Auth} from '../../services/auth.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  clubs;
  constructor(public clubService: ClubService, private auth: Auth) {
    this.clubService.getClubs()
      .subscribe(
        club => {
            console.log(club.json());
            this.clubs = club.json();
          },
        err => {console.log(err); }
      );
  }

  ngOnInit() {
  }

}
