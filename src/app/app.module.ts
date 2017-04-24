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
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClubComponent } from './club/club.component';

const appRoutes: Routes = [
  { path: 'homepage', component: HomeComponent },
  { path: 'event', component: EventComponent },
  { path: 'club', component: ClubComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    HomeComponent,
    ClubComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
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
