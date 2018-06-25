import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userConnected; 
  private sessionUser;
  public isLogged: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  //On vérifie si l'utilisateur n'est pas déjà connecté avant de parser l'objet en sessionStorage et de créer un utilisateur
  isConnected() {
    if (this.sessionUser)
      return true;

    this.sessionUser = JSON.parse(sessionStorage.getItem('user'));
    if (this.sessionUser != null) {
      this.isLogged = true;
      this.userConnected = {
        name: this.sessionUser.name,
        surname: this.sessionUser.surname,
        type: this.sessionUser.type
      }

      return true;
    }

    return false;
  }

  //On déconnecte l'utilisateur en retirant l'objet dans le sessionStorage et en le redirigeant
  deconnectUser(): void {
    this.sessionUser = false;

    this.userConnected = {
      name: "",
      surname: ""
    }
    sessionStorage.removeItem('user');
    this.router.navigate(["/", "login"]);
  }

}
