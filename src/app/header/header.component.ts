import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userConnected; 
  private sessionUser;
  public isLogged: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  isConnected() {
    if (this.sessionUser)
      return true;

    this.sessionUser = JSON.parse(sessionStorage.getItem('user'));
    if (this.sessionUser != null) {
      this.isLogged = true;
      this.userConnected = {
        name: this.sessionUser.name,
        surname: this.sessionUser.surname
      }

      return true;
    }

    return false;
  }

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
