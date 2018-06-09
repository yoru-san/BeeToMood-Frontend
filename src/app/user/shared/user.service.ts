import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class UserService {

  private userUrl = "http://localhost:8080/api/users";

  constructor(private http : HttpClient) { }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  postUser(user) : Observable<User> {
    console.log(user);
    return this.http.post<User>(this.userUrl, {name: user.name, surname: user.surname, email: user.email, password: user.password, type: user.type});
  }

  removeUser(userId): Observable<User> {
    return this.http.delete<User>(this.userUrl + "/" + userId);
  }
}
