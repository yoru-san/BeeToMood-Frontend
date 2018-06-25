import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Group } from './group';

@Injectable()
export class GroupService {
  
  private groupUrl = "http://localhost:8080/api/groups/";
  
  constructor(private http: HttpClient) { }
  
  //Récupération des groupes
  getGroups(param?): Observable<Group[]> {
    return this.http.get<Group[]>(this.groupUrl, { params: {
      managerId: param
    }
  });
  }

  //Récupération d'un groupe précis
  getGroup(groupId): Observable<Group> {
    return this.http.get<Group>(this.groupUrl + groupId);
  }

  //Création d'un groupe
  postGroup(group): Observable<Group> {    
    group.nextNotificationDate = group.nextNotificationDate.hour + ":" + group.nextNotificationDate.minute;
    return this.http.post<Group>(this.groupUrl, {name: group.name, mailDate: group.nextNotificationDate, managerId: group.managerId});
  }

  //Suppresion d'un groupe
  removeGroup(groupId): Observable<Group> {
    return this.http.delete<Group>(this.groupUrl + groupId);
  }

  //Mise à jour d'un groupe
  updateGroup(group): Observable<Group> {
    return this.http.put<Group>(this.groupUrl + group._id, { name: group.name, mailDate: group.nextNotificationDate});
  }
}
