import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/event.service';
import {EventModel} from '../../models/EventModel';

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.css']
})
export class EventdetailsComponent implements OnInit {
  id;
  private event = new EventModel('', '', '', 0, '', '', 0, new Date(), 1, '', null, '', '');
  place = '';
  constructor(public route: ActivatedRoute, public eventService: EventService) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.eventService.getEventById(this.id).subscribe(
        (data) => {
          this.copyObjectToModel(data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  private copyObjectToModel(data: Object) {
    this.event.eventName = data['eventName'];
    this.event.eventStatus = data['eventStatus'];
    this.event.eventDesc = data['eventDesc'];
    this.event.eventOwnerId = data['eventOwnerId'];
    this.event.eventStartCity = data['eventStartCity'];
    this.event.eventStartState = data['eventStartState'];
    this.event.eventStartPostCode = data['eventStartPostCode'];
    this.event.eventEndCity = data['eventEndCity'];
    this.event.eventEndState = data['eventEndState'];
    this.event.eventEndPostCode = data['eventEndPostCode'];
    this.event.eventStartDateTime = data['eventStartDateTime'];
    this.event.eventUsers = data['eventUsers'];
    this.place = `//www.google.com/maps/embed/v1/place?q=` + this.event.eventStartCity + `,` + this.event.eventStartState + `%20` + this.event.eventStartPostCode + `,%20USA
      &zoom=17&key=AIzaSyAfMykjowoCVnljt7RfI2dNQs2StshJW_g`;
  }
}
