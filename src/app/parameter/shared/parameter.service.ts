import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ParameterService {
  
  private parameterUrl = "http://localhost:8080/api/users/";

  constructor(private http: HttpClient) { }

  //Mise à jour du nouveau mot de passe de l'utilisateur
  updatePassword(_id, password) {
    console.log(_id)
    return this.http.patch(this.parameterUrl + _id, {password: password});
  }
}
