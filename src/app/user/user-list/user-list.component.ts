import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users : User[] = [];
  constructor(private userService : UserService, private toastrService: ToastrService, private router: Router) { }
  
  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      data.forEach(user => {
        if (user.type != "Admin")
          this.users.push(user);
         
      });
    });
  }
  
  //Supression d'un utilisateur avec retrait de la liste
  deleteUser(user) {
    this.userService.removeUser(user).subscribe(data => {
      let userIndexDeleted = this.users.findIndex(x => x._id == data._id);
      this.users.splice(userIndexDeleted, 1);
      this.toastrService.info('Utilisateur ' + data.name + " " + data.surname + ' supprimé');
    });
  }
}
