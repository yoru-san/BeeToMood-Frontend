import { Component, OnInit } from '@angular/core';
import { Review } from '../shared/review';
import { ReviewService } from '../shared/review.service';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../../group/shared/group';
import { User } from '../../user/shared/user';
import { GroupService } from '../../group/shared/group.service';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.scss']
})
export class ReviewAddComponent implements OnInit {

  review: Review;
  connectedUser: User;
  usergroups: Group[];

  constructor(private reviewService : ReviewService, private toastrService : ToastrService, private groupService: GroupService) { }

  ngOnInit() {
    this.usergroups = [];

    this.connectedUser = JSON.parse(sessionStorage.getItem('user'));
      this.connectedUser.groups.forEach(g => {
        this.usergroups.push(g);
        console.log(this.usergroups)
      });
    
    this.review = {
      groupId: "",
      mood: "",
      comment: "",
      date: null
    };
  }

  sendNewReview() {
    console.log(this.review);
    this.review.date = new Date();
    this.reviewService.postReview(this.review).subscribe(() => {
      this.toastrService.info('Envoyée', 'Votre review a bien été envoyée.');
      this.review = {
        groupId: "",
        mood: "",
        comment: "",
        date: null
      };
    });
  }
}
