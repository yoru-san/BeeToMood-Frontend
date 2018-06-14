import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../shared/review.service';
import { Review } from '../shared/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  public reviews : Review;
  constructor(private reviewService : ReviewService) { }

  ngOnInit() {
    this.reviewService.getReview().subscribe(data => {
      this.reviews = data;
    });
  }

}
