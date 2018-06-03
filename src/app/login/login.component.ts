import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from './shared/login.service';
import * as shajs from 'sha.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private user;
  
  constructor(private loginService: LoginService, private router: Router) {}
  
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
      this.router.navigate(["/index"]);
    });
  }
}
