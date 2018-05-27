import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Review } from './review';

@Injectable()
export class ReviewService {
  
  private reviewUrl = "http://192.168.0.36:8080/api/reviews"

  constructor(private http : HttpClient ) { }

  getReview (): Observable<any> {
    return this.http.get(this.reviewUrl);
  }

  postReview(review: Review) : Observable<Review> {
    return this.http.post<Review>(this.reviewUrl, { mood: review.mood, comment: review.comment, date: review.date});
  }

}
