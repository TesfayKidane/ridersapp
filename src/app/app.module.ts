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
import { ClubComponent } from './club/clubs/club.component';
import { CreatClubComponent } from './club/creat-club/creat-club.component';
import { DetailClubComponent } from './club/detail-club/detail-club.component';
import {Auth} from './services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import {UserService} from './services/user.service';
import {ClubService} from './services/club.service';
import { ClubPipe } from './pipe/club.pipe';
import {WebChatComponent} from './web-chat/web-chat.component';
import {SharedService} from './services/SharedService';
import {SearchUserPipe} from './services/searchUserPipe';
import {AgmCoreModule} from 'angular2-google-maps/core';
import { CreateAnnouncementComponent } from './announcement/create-announcement/create-announcement.component';
import {AnnouncementService} from './services/announcement.service';

const appRoutes: Routes = [
  { path: 'homepage', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'event/new/:id', component: EventComponent },
  { path: 'events/:id', component: EventdetailsComponent },
  { path: 'club', component: ClubComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'webchat', component: WebChatComponent },
  { path: 'club/new', component: CreatClubComponent },
  { path: 'club/:id', component: DetailClubComponent },
  { path: 'announcement/new/:id', component: CreateAnnouncementComponent },
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
    ClubPipe,
    DetailClubComponent,
    WebChatComponent,
    SearchUserPipe,
    ProfileComponent,
    CreateAnnouncementComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAgRXJJQPFMO2ZZVfLea_AEsBIdYikiljw'
    })
  ],
  providers: [EventService, ChatService, Auth, UserService, ClubService,
    SharedService, SearchUserPipe, AnnouncementService],  // , AUTH_PROVIDERS, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
