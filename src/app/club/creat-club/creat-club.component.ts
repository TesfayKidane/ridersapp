import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-creat-club',
  templateUrl: './creat-club.component.html',
  styleUrls: ['./creat-club.component.css']
})
export class CreatClubComponent implements OnInit {

  clubForm: FormGroup;
  constructor(public fb: FormBuilder) { }

  ngOnInit() {
  }

}
