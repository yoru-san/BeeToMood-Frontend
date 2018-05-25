import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GroupService {
  
  private groupUrl = "http://192.168.0.36:8080/api/groups"
  
  constructor(private http : HttpClient ) { }
  
  getGroup (): Observable<any> {
    return this.http.get(this.groupUrl);
  }

  postGroup() : Observable<any> {
    return this.http.post(this.groupUrl, {name: "group1", mailDate:"1995-12-17T03:24:00"});
  }
}
