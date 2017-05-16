import {RequestOptions, Headers} from '@angular/http';
/**
 * Created by sherxon on 4/24/17.
 */

export class SharedService {
      static API_URL = 'http://localhost:9000/';
      //static API_URL = 'https://cyclingapi.herokuapp.com/';
      static API_CHAT = SharedService.API_URL + 'chat/';
      static API_URL_USERS = SharedService.API_URL + 'users/';
      static API_USER_ADD = SharedService.API_URL_USERS + 'adduser/';
      static API_EVENTS = SharedService.API_URL + 'events/';
      static API_ADD_EVENT = SharedService.API_EVENTS + 'addevent/';
      // static AUTH = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqTkJNMEl6T0RKQ09EYzFNRVpGT1VRNE1FTkVNVEUxT1RreE4wUXdOakEzTXpFMU1rTTRSQSJ9';
      static API_ADD_USER_TO_EVENT = SharedService.API_EVENTS + 'adduser/';
      static API_REQUEST_OPTIONS = (function () {
      const headers = new Headers({'Content-Type': 'application/json'});
      // headers.append('authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqTkJNMEl6T0RKQ09EYzFNRVpGT1VRNE1FTkVNVEUxT1RreE4wUXdOakEzTXpFMU1rTTRSQSJ9.eyJpc3MiOiJodHRwczovL2Jpa2VyaWRlcnMuYXV0aDAuY29tLyIsInN1YiI6InpHTWhDMVpEeVNYdUY5YnkxVEZSTVQ4Y2RpeHFGSnRsQGNsaWVudHMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAiLCJleHAiOjE0OTMyNzM4NTIsImlhdCI6MTQ5MzE4NzQ1Miwic2NvcGUiOiIifQ.nFy2FeC5SeNEiTgHyqA20R69qS7r1mRgSzDzVInRtrUY8qXOgivXwAuXV5dPVf3T3QjPCsUvyTPA7wcqB5ZQu8-kWr1n32prnTleRb83IhXr04DmoD1Uaeb-j98876fbmxFWzlWDJxXpL_FfIevRKvDmz-Gg1cwniPFbZfjnBWBBSdPiO0nOKrtuDFUmor7hs7-oRdRB2oyQnndC4wWNSB0UvJIn52BbldTx69P5btaN2V4xaJg8SHTRhga8f2oMSpfAztSDjw110ye8SHG225O7ghe4qAtFJuC0V1nuaPTM6l7OawJ4tDmE-_hKpq0T32U1R6eELHeRGqDfSIRX-A');
      const token = localStorage.getItem('id_token');
      headers.append('token', token);
      const profile = JSON.parse(localStorage.getItem('profile'));
      const email = profile.email;
      headers.append('email', email);
      return new RequestOptions({headers: headers});
  });

  static API_REQUEST_HEADER = (function () {
    const headers = new Headers({'Content-Type': 'application/json'});
    // headers.append('authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqTkJNMEl6T0RKQ09EYzFNRVpGT1VRNE1FTkVNVEUxT1RreE4wUXdOakEzTXpFMU1rTTRSQSJ9.eyJpc3MiOiJodHRwczovL2Jpa2VyaWRlcnMuYXV0aDAuY29tLyIsInN1YiI6InpHTWhDMVpEeVNYdUY5YnkxVEZSTVQ4Y2RpeHFGSnRsQGNsaWVudHMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAiLCJleHAiOjE0OTMyNzM4NTIsImlhdCI6MTQ5MzE4NzQ1Miwic2NvcGUiOiIifQ.nFy2FeC5SeNEiTgHyqA20R69qS7r1mRgSzDzVInRtrUY8qXOgivXwAuXV5dPVf3T3QjPCsUvyTPA7wcqB5ZQu8-kWr1n32prnTleRb83IhXr04DmoD1Uaeb-j98876fbmxFWzlWDJxXpL_FfIevRKvDmz-Gg1cwniPFbZfjnBWBBSdPiO0nOKrtuDFUmor7hs7-oRdRB2oyQnndC4wWNSB0UvJIn52BbldTx69P5btaN2V4xaJg8SHTRhga8f2oMSpfAztSDjw110ye8SHG225O7ghe4qAtFJuC0V1nuaPTM6l7OawJ4tDmE-_hKpq0T32U1R6eELHeRGqDfSIRX-A');
    const token = localStorage.getItem('id_token');
    headers.append('token', token);
    const profile = JSON.parse(localStorage.getItem('profile'));
    const email = profile.email;
    headers.append('email', email);

    return headers;
  });
}
