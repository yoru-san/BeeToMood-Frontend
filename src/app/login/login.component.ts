import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './shared/login.service';
import * as shajs from 'sha.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public user;
  private connectedUser;

  
  constructor(private loginService: LoginService, private router: Router, private toastrService: ToastrService) {}
  
  ngOnInit() {
    sessionStorage.removeItem('user');
    this.user = {
      email: "",
      password: ""
    }
    this.connectedUser = {
      type: "",
      name: "",
      surname: ""
    }
  }
  
  connexion() {
    this.user.password = shajs('sha256').update(this.user.password).digest('hex');
    this.loginService.findExistingUser(this.user).subscribe(data => {
      if (data) {
        this.connectedUser.id = data._id;
        this.connectedUser.type = data.type;
        this.connectedUser.name = data.name;
        this.connectedUser.surname = data.surname;        
        sessionStorage.setItem('user', JSON.stringify(this.connectedUser));
        this.router.navigate(["/"]);
      } else {
        this.user.email = "";
        this.user.password = "";        
        this.toastrService.error('Mauvais identifiants !', 'Erreur');
      }
    });
  }
}
