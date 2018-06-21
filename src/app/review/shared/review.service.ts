import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Review } from './review';
import * as moment from 'moment';

@Injectable()
export class ReviewService {
  
  private reviewUrl = "http://localhost:8080/api/reviews/"

  constructor(private http : HttpClient) { }

  getReview (userId): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewUrl + userId);
  }

  getReviews(groupId): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewUrl, { params: {
      group: groupId,
      date: moment().format("MMM Do YY")
    }});
  }

  postReview(review) : Observable<Review> {
    return this.http.post<Review>(this.reviewUrl, { group: review.group, userId: review.userId, mood: review.mood, comment: review.comment, date: review.date});
  }

}
