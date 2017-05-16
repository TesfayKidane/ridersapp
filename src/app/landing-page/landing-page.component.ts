import { Component, OnInit } from '@angular/core';
import {Auth} from '../services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

}
