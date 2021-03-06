import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class UserService {
  
  private userUrl = "http://localhost:8080/api/users/";
  
  constructor(private http : HttpClient) { }
  
  //Récupération de tous les utilisateurs
  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
  
  //Récupération d'un utilisateur précis
  getUser(userId) : Observable<User> {
    return this.http.get<User>(this.userUrl + userId);
  }
  
  //Création d'un nouvel utilisateur
  postUser(user) : Observable<User> {
    return this.http.post<User>(this.userUrl, {name: user.name, surname: user.surname, email: user.email, password: user.password, type: user.type, groups: user.groups, firstConnection: user.firstConnection});
  }
  
  //Mise à jour d'un utilisateur
  updateUser(user) : Observable<User> {
    return this.http.put<User>(this.userUrl + user._id, {name: user.name, surname: user.surname, email: user.email, password: user.password, type: user.type, groups: user.groups});
  }
  
  //Suppression d'un utilisateur
  removeUser(userId): Observable<User> {
    return this.http.delete<User>(this.userUrl + userId);
  }
}
