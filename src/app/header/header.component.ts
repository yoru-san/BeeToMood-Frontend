import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userConnected; 
  private sessionUser;

  constructor() { }

  ngOnInit() {
    this.sessionUser = JSON.parse(sessionStorage.getItem('user'));
    this.userConnected = {
      name: this.sessionUser.name,
      surname: this.sessionUser.surname
    }
  }

}
