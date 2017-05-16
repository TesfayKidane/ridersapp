import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/event.service';
import {EventModel} from '../../models/EventModel';
import {Auth} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.css']
})
export class EventdetailsComponent implements OnInit {
  // initial center position for the map
  isOwner = false;
  joined  = false;
  started = false;
  participants = 0;

  zoom = 10;

  lng: number = -91.970417;
  lat = 41.018210;

  lng2: number = -91.970417;
  lat2 = 40.918210;

  location = {};
  markers: Marker[] = [];

  id;
  currentUserProfile;
  public myEvent  = {eventStartLoc: {coordinates: []}, eventEndLoc: {coordinates: []}};
  private event = new EventModel('', '', '', '', 0, '', '', 0, new Date(), 1, false, null, '', '', [], []);
  place = '';
  eventOwnerName;
  message;
  obSubs;
  constructor(public route: ActivatedRoute, public eventService: EventService, public userService: UserService, public auth: Auth) {

    this.currentUserProfile = userService.getLoggedInUser();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.eventService.getEventById(this.id).subscribe(
        (data) => {
          this.myEvent = data.json();
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
  onJoinEvent() {
    this.eventService.addUserToEvent(this.event.eventId, this.currentUserProfile._id).subscribe(
      (data) => {
        console.log(data);
        this.participants++;
        this.joined = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  private copyObjectToModel(data: Object) {
    this.event.eventId = data['_id'];
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
    // this.event.eventUsers = data['eventUsers'];

    this.eventOwnerName =  this.userService.getUserById(data['eventOwnerId']);

    if (this.currentUserProfile._id === this.event.eventOwnerId) {
      this.isOwner = true;
    }

    if (this.event.eventStatus) {
      this.started = true;
    }

    if ( this.isOwner && this.started ) {
      this.startEvent();
    }
    this.participants = data['eventUserIds'] ? data['eventUserIds'].length : 0;
  }

  stopEvent() {
    this.obSubs.unsubscribe();
    this.started = false;
  }

  startEvent() {
    // test interval
    this.obSubs = Observable.interval(3000)
      .map( (x) => x + 1 )
      .subscribe((x) => {
        this.message = x;
        if ( navigator.geolocation ) {
          navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
      });
    // endtest interval
  }

  setPosition(position) {
    this.location = position.coords;
    const currentLat = position.coords.latitude;
    const currentLng = position.coords.longitude;
    this.markers.push({
      lat: currentLat,
      lng: currentLng,
      draggable: false,
      iconUrl: 'http://www.hckrecruitment.nic.in/images/blue.png'
    });
  }
}
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  iconUrl: string;
}
