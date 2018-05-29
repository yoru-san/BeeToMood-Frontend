import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class LoginService {

  private connexionUrl = "http://localhost:8080/api/connexion";
  constructor(private http : HttpClient) { }

  findExistingUser(user) {
    return this.http.post(this.connexionUrl, {user});
  }
}
