import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class UserService {

  private userUrl = "http://localhost:8080/api/users/";

  constructor(private http : HttpClient) { }

  getUser(userId) : Observable<User> {
    return this.http.get<User>(this.userUrl + userId);
  }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  postUser(user) : Observable<User> {
    return this.http.post<User>(this.userUrl, {name: user.name, surname: user.surname, email: user.email, password: user.password, type: user.type, groups: user.groups, firstConnection: user.firstConnection});
  }

  updateUser(user) : Observable<User> {
    return this.http.put<User>(this.userUrl + user._id, {name: user.name, surname: user.surname, email: user.email, password: user.password, type: user.type, groups: user.groups});
  }


  removeUser(userId): Observable<User> {
    return this.http.delete<User>(this.userUrl + userId);
  }
}
