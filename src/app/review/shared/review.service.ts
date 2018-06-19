import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Review } from './review';
import { query } from '@angular/core/src/render3/instructions';

@Injectable()
export class ReviewService {
  
  private reviewUrl = "http://localhost:8080/api/reviews"

  constructor(private http : HttpClient) { }

  getReview (query): Observable<any> {
    console.log(query)
    return this.http.get(this.reviewUrl + "?" + query);
  }

  postReview(review: Review) : Observable<Review> {
    return this.http.post<Review>(this.reviewUrl, { mood: review.mood, comment: review.comment, date: review.date});
  }

}
