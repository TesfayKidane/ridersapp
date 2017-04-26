import { Component, OnInit } from '@angular/core';
import {GoogleMapService} from '../services/googlemap.service';
import {ClubService} from '../services/club.service';
import {Auth} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // google maps zoom level
  zoom: number = 10;

  // initial center position for the map
  lat: number = 41.018210;
  lng: number = -91.970417;
  location = {};
  markers: Marker[] = [];
  showCircle= false;
  btnText = 'Select Clubs';
  constructor(public mapdb: ClubService, private auth: Auth) { }

  ngOnInit() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }
  showClubs() {
    if(this.btnText === 'Select Clubs') {
      this.btnText = 'Show Clubs';
      this.showCircle = true;
      this.mapdb.getNearbyClubs(this.lat, this.lng).subscribe(s => {
        const json = s.json();
        for (const key in json) {
          this.markers.push({
            lat: json[key].coords.lat,
            lng: json[key].coords.lng,
            draggable: true
          });
        }
      });
    }else {
      this.btnText = 'Select Clubs';
      this.showCircle = false;
    }
  }
  setPosition(position) {
    this.location = position.coords;
    console.log(position.coords);
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }
  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  mapClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
}
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
