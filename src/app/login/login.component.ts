import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.user.email = "";
    this.user.password = "";
  }

}
