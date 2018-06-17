import { Component, OnInit } from '@angular/core';
import { Review } from '../shared/review';
import { ReviewService } from '../shared/review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.scss']
})
export class ReviewAddComponent implements OnInit {

  review: Review;

  constructor(private reviewService : ReviewService, private toastrService : ToastrService) { }

  ngOnInit() {
    this.review = {
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
        mood: "",
        comment: "",
        date: null
      };
    });
  }
}
