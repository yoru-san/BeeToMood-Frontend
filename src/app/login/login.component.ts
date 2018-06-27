import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './shared/login.service';
import * as shajs from 'sha.js';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user/shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public user: User;
  private connectedUser;

  
  constructor(private loginService: LoginService, private router: Router, private toastrService: ToastrService) {}
  
  ngOnInit() {
    //On retire l'objet en sesssionStorage systématiquement
    sessionStorage.removeItem('user');
    this.user = {
      _id: "",
      name: "",
      surname: "",
      groups: [],
      email: "",
      type: "",
      password: "",
      firstConnection: false
    }
    this.connectedUser = {
      type: "",
      name: "",
      surname: ""
    }
  }
  
  //On hash le mot de passe avant de vérifier l'existence de l'utilisateur en base
  connexion() {
    this.user.password = shajs('sha256').update(this.user.password).digest('hex');
    this.loginService.findExistingUser(this.user).subscribe(data => {
      if (data) {
        this.connectedUser._id = data._id;
        this.connectedUser.type = data.type;
        this.connectedUser.name = data.name;
        this.connectedUser.surname = data.surname;    
        this.connectedUser.groups = data.groups; 
        //Si c'est la première connexion de l'utilisateur, on le redirige vers les paramètres
        if (!data.firstConnection) {
          data.firstConnection = true;
          this.connectedUser.firstConnection = data.firstConnection;
        //On crée un nouvel objet en sessionStorage   
        sessionStorage.setItem('user', JSON.stringify(this.connectedUser));
          this.loginService.changeConnectionStatus(this.connectedUser).subscribe((data) => {
            this.router.navigate(["/parameters"]);
          });
        } else {
          sessionStorage.setItem('user', JSON.stringify(this.connectedUser));
          this.router.navigate(["/"]);
        }
      } else {
        this.user.email = "";
        this.user.password = "";        
        this.toastrService.error('Mauvais identifiants !', 'Erreur');
      }
    });
  }
}
