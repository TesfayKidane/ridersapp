import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnnouncementModel} from '../../models/AnnouncementModel';
import {ActivatedRoute, Router} from '@angular/router';
import {AnnouncementService} from '../../services/announcement.service';
import {ClubService} from '../../services/club.service';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent implements OnInit {
  private clubId;
  submitted  = false;
  anForm: FormGroup;
  private anModel = new AnnouncementModel('', '', new Date(), false, '');
  constructor(private route: ActivatedRoute,
              private anService: AnnouncementService,
              public fb: FormBuilder,
              private router: Router
  ) {
    this.anForm = this.fb.group({
      'content' : ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clubId = params['id'];
    });
  }

  onSubmit() {
    this.submitted = true;
    this.anModel = this.anForm.value;
    this.anModel.ownerId = '1';
    this.anModel.createdAt = new Date();
    this.anModel.status = true;
    this.anModel.clubId = this.clubId;
    console.log(this.anModel);
    this.anService.postAnnouncement(this.anModel)
      .subscribe(
        club => {
          this.router.navigate(['/club/' + this.clubId]);
        },
        err => {console.log(err); }
      );
  }

}
