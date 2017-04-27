import {RequestOptions, Headers} from '@angular/http';
/**
 * Created by sherxon on 4/24/17.
 */

export class SharedService {
      static API_URL = 'http://localhost:9000/';
      static API_CHAT = SharedService.API_URL + 'chat/';
      static API_URL_USERS = SharedService.API_URL + 'users/';
      static API_USER_ADD = SharedService.API_URL_USERS + 'adduser/';
      static API_EVENTS = SharedService.API_URL + 'events/';
      static API_ADD_EVENT = SharedService.API_EVENTS + 'addevent/';
      static AUTH = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqTkJNMEl6T0RKQ09EYzFNRVpGT1VRNE1FTkVNVEUxT1RreE4wUXdOakEzTXpFMU1rTTRSQSJ9.eyJpc3MiOiJodHRwczovL2Jpa2VyaWRlcnMuYXV0aDAuY29tLyIsInN1YiI6InpHTWhDMVpEeVNYdUY5YnkxVEZSTVQ4Y2RpeHFGSnRsQGNsaWVudHMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAiLCJleHAiOjE0OTMzODY2MjgsImlhdCI6MTQ5MzMwMDIyOCwic2NvcGUiOiIifQ.ooi_PeJLPDW8ghLL-9TX9IMwS68oNq5IOxSYE9IgBBmiYonEgKU4nJzfg0q1JL6l17sZUlbgovwLkwCLtJlpvY1nJkbzz-nrt9M-_dmFNavJxydqKtCEEmblCEifr_OFxCo5hdwRO2tW78EnjRLlUdkcEp1LfhzX8w4M6b0_VNJ2_4bXTPVCdt3G46eeU5VNLG2sykwn3gseavjIcYr8-lH_JEGU9AegUpQO0fL_KMq77D1xwcIflYzoxysGkvjI-XqtOsYVG_0TpBzYk7Nf6mhA4VivY-vOfzbStAYPENkom0yXv6jMP8tKNqYMOdq7tBZkSi33czlRoYdGk69BlQ';
      static API_ADD_USER_TO_EVENT = SharedService.API_EVENTS + 'adduser/';
      static API_REQUEST_OPTIONS = (function () {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.append('authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqTkJNMEl6T0RKQ09EYzFNRVpGT1VRNE1FTkVNVEUxT1RreE4wUXdOakEzTXpFMU1rTTRSQSJ9.eyJpc3MiOiJodHRwczovL2Jpa2VyaWRlcnMuYXV0aDAuY29tLyIsInN1YiI6InpHTWhDMVpEeVNYdUY5YnkxVEZSTVQ4Y2RpeHFGSnRsQGNsaWVudHMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAiLCJleHAiOjE0OTMzODY2MjgsImlhdCI6MTQ5MzMwMDIyOCwic2NvcGUiOiIifQ.ooi_PeJLPDW8ghLL-9TX9IMwS68oNq5IOxSYE9IgBBmiYonEgKU4nJzfg0q1JL6l17sZUlbgovwLkwCLtJlpvY1nJkbzz-nrt9M-_dmFNavJxydqKtCEEmblCEifr_OFxCo5hdwRO2tW78EnjRLlUdkcEp1LfhzX8w4M6b0_VNJ2_4bXTPVCdt3G46eeU5VNLG2sykwn3gseavjIcYr8-lH_JEGU9AegUpQO0fL_KMq77D1xwcIflYzoxysGkvjI-XqtOsYVG_0TpBzYk7Nf6mhA4VivY-vOfzbStAYPENkom0yXv6jMP8tKNqYMOdq7tBZkSi33czlRoYdGk69BlQ');
      const token = localStorage.getItem('id_token');
      headers.append('token', token);
      const profile = JSON.parse(localStorage.getItem('profile'));
      const email = profile.email;
      headers.append('email', email);
      return new RequestOptions({headers: headers});
    });
}
