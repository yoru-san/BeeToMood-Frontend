import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Group } from '../../group/shared/group';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import * as shajs from 'sha.js';
import { GroupService } from '../../group/shared/group.service';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  
  user: User;
  connectedUser: User;
  userId: string;
  groups: Group[];
  isAllowed: boolean;
  
  constructor(
    private userService: UserService, 
    private groupService: GroupService, 
    private toastrService: ToastrService, 
    private activatedRoute: ActivatedRoute) {}
  
  ngOnInit() {
    this.connectedUser = JSON.parse(sessionStorage.getItem('user'));
    //Vérification que l'utilisateur soit administrateur pour créer un Manager
    if (this.connectedUser.type == "Admin") {
      this.isAllowed = true;
    }
    this.groupService.getGroups(this.connectedUser._id).subscribe(data => {
      console.log(data)
      this.groups = data;
    });
    this.user = {
      _id: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      groups: [],
      type: "",
      firstConnection: null
    };

    //Si l'utilisateur existe déjà
    this.userId = this.activatedRoute.snapshot.params.id;
    if (!(isNullOrUndefined(this.userId))) {
      this.userService.getUser(this.userId).subscribe(data => {
        this.user = data;
      })
    }
  }
  
  //Envoi d'un nouvel utilisateur avec hashage du mot de passe
  sendNewUser() {
    this.user.password = shajs('sha256').update(this.user.password).digest('hex');
    this.userService.postUser(this.user).subscribe(() => {
      this.toastrService.info('Votre utilisateur a bien été crée.', 'Envoyé');
      this.user = {
        _id: "",
        name: "",
        surname: "",
        email: "",
        password: "",
        groups: Group[""],
        type: "",
        firstConnection: null
      };
    });
  }

  //Mise à jour d'un utilisateur avec hashage du mot de passe
  updateExistingUser() {
    this.user.password = shajs('sha256').update(this.user.password).digest('hex');
    this.userService.updateUser(this.user).subscribe(() => {
      this.toastrService.info('Votre utilisateur a bien été modifié.', 'Envoyé')
    });
  }
}
