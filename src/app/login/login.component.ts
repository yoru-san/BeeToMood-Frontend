import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from './shared/login.service';
import * as shajs from 'sha.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private user;
  private connectedUser;

  
  constructor(private loginService: LoginService, private router: Router, private toastrService : ToastrService) {}
  
  ngOnInit() {
    sessionStorage.removeItem('user');
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
      if (data) {
        this.connectedUser.id = data[0].id;
        this.connectedUser.type = data[0].type
        sessionStorage.setItem('user', JSON.stringify(this.connectedUser));
        this.router.navigate(["/index"]);
      } else {
        this.toastrService.error('Mauvais identifiants !', 'Erreur');
      }
    });
  }
}
