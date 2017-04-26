import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClubService} from '../../services/club.service';
import {ClubModel} from '../../models/ClubModel';
import {AnnouncementService} from "../../services/announcement.service";

@Component({
  selector: 'app-detail-club',
  templateUrl: './detail-club.component.html',
  styleUrls: ['./detail-club.component.css']
})
export class DetailClubComponent implements OnInit {
  public id;
  public club = new ClubModel('', '', '', 0, '', 0, [], [], []);
  public announcements;
  constructor(private route: ActivatedRoute,
              private clubService: ClubService,
              private anService: AnnouncementService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.clubService.getClubById( this.id ).subscribe(
        data => {
          this.club = data; }
      );
      this.anService.getAnnouncement( this.id ).subscribe(
        datas => {
          this.announcements = datas;
      });
    });
  }

}
