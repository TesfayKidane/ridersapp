import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/event.service';
import {EventModel} from '../../models/EventModel';
import {Auth} from "../../services/auth.service";

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.css']
})
export class EventdetailsComponent implements OnInit {
  // initial center position for the map
  zoom: number = 10;

  lng: number = -91.970417;
  lat: number = 41.018210;

  lng2: number = -91.970417;
  lat2: number = 40.918210;

  location = {};
  markers: Marker[] = [];

  id;
  public myEvent  = {eventStartLoc: {coordinates: []}, eventEndLoc: {coordinates: []}};
  private event = new EventModel('', '', '', 0, '', '', 0, new Date(), 1, '', null, '', '', [], []);
  place = '';
  constructor(public route: ActivatedRoute, public eventService: EventService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.eventService.getEventById(this.id).subscribe(
        (data) => {
          this.myEvent = data.json();
          console.log(data.json());
          console.log('salom');
          this.copyObjectToModel(data.json());
          this.lng = this.myEvent.eventStartLoc.coordinates[0];
          this.lat = this.myEvent.eventStartLoc.coordinates[1];
          this.lng2 = this.myEvent.eventEndLoc.coordinates[0];
          this.lat2 = this.myEvent.eventEndLoc.coordinates[1];

          this.markers.push({
            lat: this.lat,
            lng: this.lng,
            draggable: false,
            iconUrl: 'https://www.westarenergy.com/Portals/0/favicon.ico'
          });

          this.markers.push({
            lat: this.lat2,
            lng: this.lng2,
            draggable: false,
            iconUrl: 'https://cdn1.iconfinder.com/data/icons/Momentum_GlossyEntireSet/32/checkered-flag.png'
          });
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
  ngOnInit() {
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
  }
}
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  iconUrl: string;
}
