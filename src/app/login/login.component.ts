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
  
  constructor(private loginService: LoginService) {}
  
  ngOnInit() {
    this.user = {
      email: "",
      password: ""
    }
  }
  
  // if currentEmail et currentPassword bon alors connexion
  connexion() {
    console.log(this.user.password);
    this.user.password = shajs('sha256').update(this.user.password).digest('hex');
    this.loginService.findExistingUser(this.user).subscribe(data => {
      console.log(data);
    });
  }
}
