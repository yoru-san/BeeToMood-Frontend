import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class ReviewService {
  
  private reviewUrl = "http://192.168.0.36:8080/api/reviews"

  constructor(private http : HttpClient ) { }

  getReview (): Observable<any> {
    return this.http.get(this.reviewUrl);
  }

  postReview() : Observable<any> {
    return this.http.post(this.reviewUrl, { mood: "cool", comment: "encore cool", date: "1995-12-17T03:24:00"});
  }

}
