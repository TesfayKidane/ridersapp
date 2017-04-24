import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import {EventService} from './services/event.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule } from '@angular/material';
import 'hammerjs';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot(),
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
