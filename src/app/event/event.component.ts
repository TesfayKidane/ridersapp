import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {EventService} from '../services/event.service';
import {EventModel} from '../models/EventModel';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  submitted  = false;
  eventForm: FormGroup;
  private eventModel = new EventModel('', '', '', 0, '', '', 0, new Date(), 1, '');
  constructor(public fb: FormBuilder, public eventService: EventService) {
    this.eventForm = fb.group({
      'eventName' : ['', [Validators.required, Validators.minLength(1)]],
      'eventStartCity' : ['', [Validators.required, Validators.minLength(1)]],
      'eventStartState' : ['', [Validators.required, Validators.minLength(1)]],
      'eventStartPostCode' : ['', [Validators.required, Validators.minLength(1)]],
      'eventEndCity' : ['', [Validators.required, Validators.minLength(1)]],
      'eventEndState' : ['', [Validators.required, Validators.minLength(1)]],
      'eventEndPostCode' : ['', [Validators.required, Validators.minLength(1)]],
      'eventStartDateTime' : ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    // console.log(this.eventForm.value);
    // this.eventService.getEvents().subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    this.eventModel = this.eventForm.value;
    this.eventModel.eventOwnerId = 1;
    this.eventModel.eventStatus = 'started';
    this.eventService.postEvent(this.eventModel)
      .subscribe(
      events => { console.log(events); },
      err => {console.log(err); }
    );
  }

  ngOnInit() {
  }

}
