import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  private userUrl = "http://localhost:8080/api/users";
  private user = {};

  constructor(private http : HttpClient) { }

  getUser() : Observable<any> {
    return this.http.get(this.userUrl);
  }

  // postUser () : Observable<any> {
  //   return this.http.post(this.userUrl, {name: 'truc', surname: 'machinchose', email: 'monmail', password: 'pswd', type:'Manager'});
  // }
}
