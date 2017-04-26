import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {EventService} from '../../services/event.service';
import {EventModel} from '../../models/EventModel';
import {Router} from "@angular/router";
import {Auth} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  submitted  = false;
  eventForm: FormGroup;
  eventDesc = 'The Tour de France is an annual multiple stage bicycle race primarily held in France, while also occasionally making passes through nearby countries.';
  private eventModel = new EventModel('', '', '', 0, '', '', 0, new Date(), 1, '', null, '');
  profile;
  constructor(public fb: FormBuilder, public eventService: EventService, public userService: UserService, public router: Router, public auth: Auth) {
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
      'eventDesc' : [this.eventDesc, []]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.eventModel = this.eventForm.value;
    this.eventModel.eventOwnerId = this.profile._id;
    this.eventModel.eventStatus = 'started';
    this.eventService.postEvent(this.eventModel)
      .subscribe(
        event => { this.router.navigate(['/events/' + event['0']._id]);},
      err => {console.log(err); }
    );
  }

  ngOnInit() {
  }

}
