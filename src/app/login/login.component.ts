import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/login.service';
import * as shajs from 'sha.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user;
  private currentEmail : String;
  private currentPassword : String;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.user.email = "";
    this.user.password = "";
  }

  // if currentEmail et currentPassword bon alors connexion
  connexion() {
    this.currentPassword = shajs('sha256').update(this.currentPassword).digest('hex');
    console.log(this.currentPassword);
  }

}
