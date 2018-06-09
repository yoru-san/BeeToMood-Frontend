import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users : User[];
  constructor(private userService : UserService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
        this.users = data;
      console.log(data);
    });
  }

  deleteUser(user) {
    this.userService.removeUser(user).subscribe(data => {
      console.log(data)
      let userIndexDeleted = this.users.findIndex(x => x._id == data._id);
      this.users.splice(userIndexDeleted, 1);
      this.toastrService.success('Utilisateur ' + data.name + " " + data.surname + ' supprimé');
    });
  }

}
