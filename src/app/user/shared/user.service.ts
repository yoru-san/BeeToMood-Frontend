import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  private userUrl = "http://localhost:8080/api/users";

  constructor(private http : HttpClient) { }

  getUser() : Observable<any> {
    return this.http.get(this.userUrl);
  }

  postUser(user) : Observable<any> {
    console.log(user);
    return this.http.post(this.userUrl, {name: user.name, surname: user.surname, email: user.email, password: user.password, type: user.type});
  }
}
