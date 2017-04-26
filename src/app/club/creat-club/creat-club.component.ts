import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ClubService } from '../../services/club.service';
import {ClubModel} from '../../models/ClubModel';
import {Router} from '@angular/router';
import 'rxjs/add/operator/startWith';
import {Auth} from '../../services/auth.service';

@Component({
  selector: 'app-creat-club',
  templateUrl: './creat-club.component.html',
  styleUrls: ['./creat-club.component.css']
})
export class CreatClubComponent implements OnInit {
  submitted  = false;
  clubForm: FormGroup;
  filteredStates: any;
  private clubModel = new ClubModel('', '', '', 0, '', 0);
  states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  constructor(public fb: FormBuilder, public clubService: ClubService, private router: Router, public auth: Auth) {
    this.clubForm = this.fb.group({
      'clubName' : ['', [Validators.required, Validators.minLength(1)]],
      'clubCity' : ['', [Validators.required, Validators.minLength(1)]],
      'clubState' : ['', [Validators.required, Validators.minLength(1)]],
      'clubPostCode' : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      'clubImage' : ['', [Validators.nullValidator]]
    });

    this.filteredStates = this.clubForm.controls['clubState'].valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
  }

  filterStates(val: string) {
    return val ? this.states.filter(s => new RegExp(`^${val}`, 'gi').test(s))
      : this.states;
  }

  onSubmit() {
    this.submitted = true;
    this.clubModel = this.clubForm.value;
    this.clubModel.clubOwnerId = 1;
    console.log(this.clubModel);
    this.clubService.postClub(this.clubModel)
      .subscribe(
        club => { this.router.navigate(['/club/' + club['0']._id]);
        },
        err => {console.log(err); }
      );
  }

  ngOnInit() {
  }

}
