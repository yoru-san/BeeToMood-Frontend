import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ParameterService {
  
  private parameterUrl = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) { }

  updatePassword(password) {
    return this.http.patch(this.parameterUrl, {password: password});
  }
}
