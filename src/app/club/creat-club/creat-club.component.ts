import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClubService } from '../../services/club.service';
import {ClubModel} from '../../models/ClubModel';
import {Router} from '@angular/router';
import 'rxjs/add/operator/startWith';
import {Auth} from '../../services/auth.service';
import {GoogleMapService} from '../../services/googlemap.service';
import {UserService} from "../../services/user.service";
import {SharedService} from "../../services/SharedService";
import { Headers } from '@angular/http';

@Component({
  selector: 'app-creat-club',
  templateUrl: './creat-club.component.html',
  styleUrls: ['./creat-club.component.css']
})
export class CreatClubComponent implements OnInit {
  submitted  = false;
  clubForm: FormGroup;
  filteredStates: any;
  private clubModel = new ClubModel('', '', '', 0, '', 0, [], [], [], []);

  // initial center position for the map
  zoom: number = 10;

  lat: number = 41.018210;
  lng: number = -91.970417;
  location = {};
  markers: Marker[] = [];
  showCircle= false;
  btnText = 'Select Clubs';
  // end map
  states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  profile;
  constructor(public fb: FormBuilder,
              public clubService: ClubService,
              private router: Router,
              public auth: Auth,
              public userService: UserService) {
    this.profile = this.userService.getLoggedInUser();
    this.clubForm = this.fb.group({
      'clubName' : ['', [Validators.required, Validators.minLength(1)]],
      'clubDescription' : ['', [Validators.required, Validators.minLength(1)]],
      'clubCity' : ['', [Validators.required, Validators.minLength(1)]],
      'clubState' : ['', [Validators.required, Validators.minLength(1)]],
      'clubLat' : ['', [Validators.nullValidator]],
      'clubLng' : ['', [Validators.nullValidator]],
      'clubPostCode' : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      'clubImage' : ['', [Validators.nullValidator]]
    });

    this.filteredStates = this.clubForm.controls['clubState'].valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
  }

  filterStates(val: string) {
    return val ? this.states.filter(s => new RegExp(`^${val}`, 'gi').test(s))
      : this.states;
  }

  onSubmit() {
    this.submitted = true;
    this.clubModel = this.clubForm.value;
    this.clubModel.clubOwnerId = this.profile._id;
    const obj = {type: 'Point', coordinates: [this.lng, this.lat]};
    this.clubModel.loc = obj;
    this.clubModel.userIds = [this.profile._id];
    this.clubModel.eventIds = [];
    this.clubModel.announceIds = [];
    this.clubService.postClub(this.clubModel)
      .subscribe(
        club => { this.router.navigate(['/club/' + club['0']._id]);
        },
        err => {console.log(err); }
      );
  }

  ngOnInit() {
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }

    this.markers.push({
      lat: this.lat,
      lng: this.lng,
      draggable: true
    });
  }
  setPosition(position) {
    this.location = position.coords;
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  }
  clickedMarker(label: string, index: number) {
  }
  markerDragEnd(m: Marker, $event: MouseEvent) {
    this.lat = $event['coords'].lat;
    this.lng = $event['coords'].lng;
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

  // file upload
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: SharedService.API_URL + 'imageUpload',
    customHeaders : { 'email': 'jaraaxai@gmail.com' }
  };
  sizeLimit = 2000000;

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }
}
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
