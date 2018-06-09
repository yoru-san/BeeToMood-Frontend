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
  public isLogged: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.sessionUser = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.sessionUser)
    if (this.sessionUser != null) {
      this.isLogged = true;
      this.userConnected = {
        name: this.sessionUser.name,
        surname: this.sessionUser.surname
      }
    }
  }

  deconnectUser(): void {
    this.userConnected = {
      name: "",
      surname: ""
    }
    sessionStorage.removeItem('user');
    this.router.navigate(["/", "login"]);
  }

}
