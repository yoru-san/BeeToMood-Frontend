import { Component, OnInit } from '@angular/core';
import * as shajs from 'sha.js';

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
    this.currentPassword = shajs('sha256').update(this.currentPassword).digest('hex');
    console.log(this.currentPassword);
  }

}
