import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Review } from './review';

@Injectable()
export class ReviewService {
  
  private reviewUrl = "http://localhost:8080/api/reviews/"

  constructor(private http : HttpClient) { }

  getReview (userId): Observable<any> {
    return this.http.get(this.reviewUrl + userId);
  }

  postReview(review) : Observable<Review> {
    return this.http.post<Review>(this.reviewUrl, { group: review.group, userId: review.userId, mood: review.mood, comment: review.comment, date: review.date});
  }

}
