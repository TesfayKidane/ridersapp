/**
 * Created by Tesfay on 4/24/2017.
 */
import { Component, OnInit, Input } from '@angular/core';
import {EventService} from '../../services/event.service';
import {Auth} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Input() events;
  @Input() clubId = null;
  @Input() profile;
  constructor(public eventService: EventService, public userService: UserService, public auth: Auth) {
    this.profile = userService.getLoggedInUser();
  }

  ngOnInit() {
    this.eventService.getEvents(this.clubId).subscribe(
      (data) => {
        this.events = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
