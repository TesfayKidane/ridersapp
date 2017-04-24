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
import {ChatService} from './services/chat.service';
import { ChatComponent } from './chat/chat.component';

import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClubComponent } from './club/club.component';
import { CreatClubComponent } from './club/creat-club/creat-club.component';
import { DetailClubComponent } from './club/detail-club/detail-club.component';

const appRoutes: Routes = [
  { path: 'homepage', component: HomeComponent },
  { path: 'event', component: EventComponent },
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
    ChatComponent,
    HomeComponent,
    ClubComponent,
    CreatClubComponent,
    DetailClubComponent
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
  providers: [EventService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
