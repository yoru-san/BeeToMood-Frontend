import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  private userUrl = "http://localhost:8080/api/users"
  constructor(private http : HttpClient) { }

  getUser() : Observable<any> {
    console.log(this.userUrl);
    return this.http.get(this.userUrl);
  }
}
