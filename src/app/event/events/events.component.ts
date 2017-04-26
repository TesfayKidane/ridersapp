/**
 * Created by Tesfay on 4/24/2017.
 */
import { Component, OnInit, Input } from '@angular/core';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Input() events;
  @Input() clubId = null;
  constructor(public eventService: EventService) { }

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
