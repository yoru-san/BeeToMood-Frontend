import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Group } from './group';

@Injectable()
export class GroupService {
  
  private groupUrl = "http://localhost:8080/api/groups"
  
  constructor(private http : HttpClient) { }
  
  getGroup (): Observable<any> {
    return this.http.get(this.groupUrl);
  }

  postGroup(group) : Observable<Group> {    
    group.nextNotificationDate = group.nextNotificationDate.hour + ":" + group.nextNotificationDate.minute;
    return this.http.post<Group>(this.groupUrl, {name: group.name, mailDate: group.nextNotificationDate});
  }
}
