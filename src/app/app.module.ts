import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EventComponent } from './event/createvent/event.component';
import {EventService} from './services/event.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule } from '@angular/material';
import 'hammerjs';
import { EventdetailsComponent } from './event/eventdetails/eventdetails.component';
import {EventsComponent} from './event/events/events.component';
import {ChatService} from './services/chat.service';
import { ChatComponent } from './chat/chat.component';

import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClubComponent } from './club/club.component';
import { CreatClubComponent } from './club/creat-club/creat-club.component';
import { DetailClubComponent } from './club/detail-club/detail-club.component';
import {Auth} from './services/auth.service';
// import {AUTH_PROVIDERS} from 'angular2-jwt';
import { ProfileComponent } from './profile/profile.component';
import {UserService} from './services/user.service';

const appRoutes: Routes = [
  { path: 'homepage', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'event/new', component: EventComponent },
  { path: 'events/:id', component: EventdetailsComponent },
  { path: 'club', component: ClubComponent },
  { path: 'club/new', component: CreatClubComponent },
  { path: 'club/:id', component: DetailClubComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventdetailsComponent,
    EventsComponent,
    ChatComponent,
    HomeComponent,
    ClubComponent,
    CreatClubComponent,
    DetailClubComponent,
    ProfileComponent
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
  providers: [EventService, ChatService, Auth, UserService],  // , AUTH_PROVIDERS, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
