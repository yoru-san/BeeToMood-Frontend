import { Component, OnInit } from '@angular/core';
import { Review } from '../shared/review';
import { ReviewService } from '../shared/review.service';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../../group/shared/group';
import { GroupService } from '../../group/shared/group.service';
import * as moment from 'moment';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.scss']
})
export class ReviewAddComponent implements OnInit {

  review: Review;
  connectedUser;
  userGroup: Group[];

  constructor(
    private reviewService : ReviewService, 
    private toastrService : ToastrService, 
    private groupService: GroupService) { }

  ngOnInit() {
    this.userGroup = [];

    this.connectedUser = JSON.parse(sessionStorage.getItem('user'));
      this.connectedUser.groups.forEach(g => {
        this.groupService.getGroup(g).subscribe(data => {
          this.userGroup.push(data);
        });
      });
    
    this.review = {
      group: "",
      userId: "",
      mood: "",
      comment: "",
      date: null
    };
  }

  sendNewReview() {
    console.log(this.connectedUser.id);
    console.log(this.review);
    this.review.date = moment().format("MMM Do YY");
    this.review.userId = this.connectedUser.id;
    this.reviewService.postReview(this.review).subscribe(() => {
      this.toastrService.info('Envoyée', 'Votre review a bien été envoyée.');
      this.review = {
        group: "",
        userId: "",
        mood: "",
        comment: "",
        date: null
      };
    });
  }
}
