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

}
