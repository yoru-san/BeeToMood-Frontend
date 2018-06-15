import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Group } from '../../group/shared/group';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import * as shajs from 'sha.js';
import { GroupService } from '../../group/shared/group.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  
  user: User;
  groups: Group[];
  isExisting: boolean;
  
  constructor(private userService: UserService, private groupService: GroupService, private toastrService: ToastrService, private router: Router) {}
  
  ngOnInit() {
    this.groupService.getGroups().subscribe(data => {
      this.groups = data;
    })
    this.user = {
      _id: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      groups: [],
      type: ""
    };
  }
  
  sendNewUser() {
    this.user.password = shajs('sha256').update(this.user.password).digest('hex');
    console.log(this.user.groups);
    this.userService.postUser(this.user).subscribe(data => {
      this.toastrService.info('Votre utilisateur a bien été crée.', 'Envoyé');
      this.user = {
        _id: "",
        name: "",
        surname: "",
        email: "",
        password: "",
        groups: Group[""],
        type: ""
      };
    });
  }

  updateExistingUser() {
    this.user.password = shajs('sha256').update(this.user.password).digest('hex');
    this.userService.updateUser(this.user).subscribe(data => {
      this.toastrService.info('Votre utilisateur a bien été modifié.', 'Envoyé')
    });
  }
}
