import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Group } from '../../group/shared/group';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import * as shajs from 'sha.js';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  
  user : User;
  
  constructor(private userService: UserService, private toastrService : ToastrService) { }
  
  ngOnInit() {
    this.user = {
      _id: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      groups: Group[""],
      type: ""
    };
  }
  
  sendNewUser() {
    this.user.password = shajs('sha256').update(this.user.password).digest('hex');
    console.log(this.user.password);
    this.userService.postUser(this.user).subscribe(data => {
      this.toastrService.info('Envoyé', 'Votre utilisateur a bien été crée.');
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
}
