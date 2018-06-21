import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../shared/review.service';
import { Review } from '../shared/review';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  public reviews : Review;
  connectedUser;
  constructor(
    private reviewService: ReviewService, 
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(sessionStorage.getItem('user'));
  // console.log(this.connectedUser.groups);
  //   this.reviewService.getReview("groupId=" + this.connectedUser.groups).subscribe(data => {
  //     this.reviews = data;
  //   });
  }

  checkUserReviews() {
    this.reviewService.getReview(this.connectedUser.id).subscribe(data => {
      data.forEach(review => {
        if (!(review.date == moment().format("MMM Do YY"))) {
          this.router.navigate(["review/add"]);
          return;
        } else {
          this.toastrService.error("Impossible d'envoyer 2 reviews le même jour", "Erreur");
        }
      });
    });
  }


}
