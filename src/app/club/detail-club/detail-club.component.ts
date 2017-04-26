import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClubService} from '../../services/club.service';

@Component({
  selector: 'app-detail-club',
  templateUrl: './detail-club.component.html',
  styleUrls: ['./detail-club.component.css']
})
export class DetailClubComponent implements OnInit {
  public id;
  public club;
  constructor(private route: ActivatedRoute, private clubService: ClubService) {
    route.params.subscribe(params => {
      this.id = params['id'];
      this.club = this.clubService.getClubById( this.id ).subscribe(
        response => console.log(response)
      );

    });
  }

  ngOnInit() {
  }

}
