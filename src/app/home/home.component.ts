import { Component, OnInit } from '@angular/core';
import {GoogleMapService} from '../services/googlemap.service';
import {ClubService} from '../services/club.service';
import {Auth} from "../services/auth.service";
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // google maps zoom level
  zoom = 10;
  showMarkers = false;
  // initial center position for the map
  lat = 41.018210;
  lng: number = -91.970417;
  location = {};
  markers: Marker[] = [];
  showCircle= false;
  btnText = 'Select Clubs';
  constructor(public mapdb: ClubService, private auth: Auth, private chat: ChatService) {
    chat.socket.connect();
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }
  showClubs() {
    this.showMarkers = true;
    this.mapdb.getNearbyClubs(this.lat, this.lng).subscribe(s => {
      const json = s.json();
      for (const key in json) {
        this.markers.push({
          lat: json[key].loc.coordinates[1],
          lng: json[key].loc.coordinates[0],
          label: json[key].clubName,
          clubName: json[key].clubName,
          clubCity: json[key].clubCity,
          clubDescription: json[key].clubDescription,
          draggable: false
        });
      }
    });
    /*if(this.btnText === 'Select Clubs') {
      this.btnText = 'Show Clubs';
      this.showCircle = true;
    }else {
      this.btnText = 'Select Clubs';
      this.showCircle = false;
    }*/
  }
  setPosition(position) {
    this.location = position.coords;
  }
  clickedMarker(label: string, index: number) {
  }
  markerDragEnd(m: Marker, $event: MouseEvent) {
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
  draggable: boolean;
  label?: string;
  clubName?: string;
  clubCity?: string;
  clubDescription?: string;
}
