import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentEmail : String;
  currentPassword : String;
  constructor() { }

  ngOnInit() {
  }

  // if currentEmail et currentPassword bon alors connexion
  connexion() {

  }

}
