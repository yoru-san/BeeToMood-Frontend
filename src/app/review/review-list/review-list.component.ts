import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../shared/review.service';
import { Review } from '../shared/review';
import { User } from '../../user/shared/user';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  public reviews : Review;
  connectedUser: User;
  constructor(private reviewService : ReviewService) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(sessionStorage.getItem('user'));
  console.log(this.connectedUser.groups);
    this.reviewService.getReview("groupId=" + this.connectedUser.groups).subscribe(data => {
      this.reviews = data;
    });
  }

  checkUserReviews() {
    this.reviewService.getReview("")
  }

}
