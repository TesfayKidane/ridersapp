import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClubService} from '../../services/club.service';
import {ClubModel} from '../../models/ClubModel';
import {AnnouncementService} from '../../services/announcement.service';
import {Auth} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-detail-club',
  templateUrl: './detail-club.component.html',
  styleUrls: ['./detail-club.component.css']
})
export class DetailClubComponent implements OnInit {
  public id;
  public club = new ClubModel('', '', '', 0, '', 0, [], [], [], '');
  public announcements;
  public members;
  private isOwner = false;
  profile;
  constructor(private route: ActivatedRoute,
              private clubService: ClubService,
              private anService: AnnouncementService,
              public auth: Auth,
              public userService: UserService) {
    this.profile = this.userService.getLoggedInUser();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.clubService.getClubById( this.id ).subscribe(
        data => {
          this.club = data.myClub;
          this.announcements = data.myAnnounce;
          this.members = data.myMembers;
          if ( this.club.clubOwnerId === this.profile._id) {
            this.isOwner = true;
          }
        }
      );
      // this.anService.getAnnouncement( this.id ).subscribe(
      //   datas => {
      //     this.announcements = datas;
      // });

      // this.clubService.getClubById( this.id ).subscribe(
      //   data => {
      //     this.club = data; }
      // );
    });
  }

  deleteAn(announcement) {
    const index = this.announcements.indexOf(announcement);
    if ( index !== -1 ) {
      this.announcements.splice(index, 1);
    }
  }
}
