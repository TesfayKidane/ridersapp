import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {EventService} from '../../services/event.service';
import {EventModel} from '../../models/EventModel';
import {ActivatedRoute, Router} from '@angular/router';
import {Auth} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private clubId;
  submitted  = false;
  eventForm: FormGroup;
  eventDesc = 'The Tour de France is an annual multiple stage bicycle race primarily held in France, while also occasionally making passes through nearby countries.';
  profile;
  private eventModel = new EventModel('', '', '', 0, '', '', 0, new Date(), 1, '', null, '', '', [], []);

  // initial center position for the map
  zoom: number = 10;

  lng: number = -91.970417;
  lat: number = 41.018210;

  lng2: number = -91.970417;
  lat2: number = 40.918210;

  location = {};
  markers: Marker[] = [];

  constructor(private route: ActivatedRoute,
              public fb: FormBuilder,
              public eventService: EventService,
              public router: Router,
              public auth: Auth,
              public userService: UserService,
  ) {
    this.profile = this.userService.getLoggedInUser();
    this.eventForm = fb.group({
      'eventName' : ['', [Validators.required, Validators.minLength(1)]],
      'eventStartCity' : ['', [Validators.required, Validators.minLength(1)]],
      'eventStartState' : ['', [Validators.required, Validators.minLength(1)]],
      'eventStartPostCode' : ['', [Validators.required, Validators.minLength(1)]],
      'eventEndCity' : ['', [Validators.required, Validators.minLength(1)]],
      'eventEndState' : ['', [Validators.required, Validators.minLength(1)]],
      'eventEndPostCode' : ['', [Validators.required, Validators.minLength(1)]],
      'eventStartDateTime' : ['', [Validators.required, Validators.minLength(1)]],
      'eventLng' : ['', [Validators.nullValidator]],
      'eventLat' : ['', [Validators.nullValidator]],
      'eventEndLng' : ['', [Validators.nullValidator]],
      'eventEndLat' : ['', [Validators.nullValidator]],
      'eventDesc' : [this.eventDesc, []]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.eventModel = this.eventForm.value;
    this.eventModel.eventOwnerId = this.profile._id;
    this.eventModel.eventStatus = 'started';
    this.eventModel.clubId = this.clubId;
    const obj = {type: 'Point', coordinates: [this.lng, this.lat]};
    const obj2 = {type: 'Point', coordinates: [this.lng2, this.lat2]};
    this.eventModel.eventStartLoc = obj;
    this.eventModel.eventEndLoc = obj2;
    this.eventService.postEvent(this.eventModel)
      .subscribe(
        event => { this.router.navigate(['/events/' + event['0']._id]);
        },
        err => {console.log(err); }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clubId = params['id'];
    });
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }

    this.markers.push({
      lat: this.lat,
      lng: this.lng,
      draggable: true
    });

    this.markers.push({
      lat: this.lat2,
      lng: this.lng2,
      draggable: true
    });
  }

  setPosition(position) {
    this.location = position.coords;
    this.lng = position.coords.longitude;
    this.lat = position.coords.latitude;

    this.lng2 = this.lng;
    this.lat2 = this.lat - 0.1;

  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }
  markerDragEnd(m: Marker, $event: MouseEvent, index: number) {
    console.log('dragEnd', m, $event['coords']);
    if (index === 0) {
      this.lat = $event['coords'].lat;
      this.lng = $event['coords'].lng;
    } else {
      this.lat2 = $event['coords'].lat;
      this.lng2 = $event['coords'].lng;
    }

  }
  mapClicked($event) {
    this.markers = [];
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
