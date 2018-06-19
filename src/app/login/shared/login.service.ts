import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../../user/shared/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  private connexionUrl = "http://localhost:8080/api/connexion/";
  constructor(private http : HttpClient) { }

  findExistingUser(user) : Observable<User> {
    return this.http.post<User>(this.connexionUrl, {email: user.email, password: user.password});
  }

  changeConnectionStatus(user): Observable<User> {
    return this.http.patch<User>(this.connexionUrl + user.id, {firstConnection: user.firstConnection});
  }

}
