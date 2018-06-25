import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../shared/group';
import { GroupService } from '../shared/group.service';
import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined } from 'util';
import { User } from '../../user/shared/user';
import { UserService } from '../../user/shared/user.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {

  groupId: string;
  group: Group;
  users: User[] = [];
  newUsers: User[] = [];
  usersInGroup: User[] = [];
  connectedUser: User;
  
  constructor(
    private groupService: GroupService,
    private userService: UserService, 
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }
  
  ngOnInit() {
    this.groupId = this.activatedRoute.snapshot.params.id;
    if (!isNullOrUndefined(this.groupId)) {
      this.groupService.getGroup(this.groupId).subscribe(data => {
        this.group = data;

        let receivedMailHour = {
          hour: +data.nextNotificationDate.toString().split(':')[0],
          minute: +data.nextNotificationDate.toString().split(':')[1]
        }

        this.group.nextNotificationDate = receivedMailHour;

        this.userService.getUsers().subscribe(data => {
          this.usersInGroup = data.filter(user => {
            if (user.groups.findIndex(group => group._id == this.groupId) != -1)
              return user;
          });
    
          this.newUsers = data.filter(user => {
            if (!this.usersInGroup.includes(user))
              return user;
          });
        });
      });
    } else {
      this.group = {
        managerId: "",
        name: "",
        nextNotificationDate: {hour: 12, minute: 0}
      };
      this.userService.getUsers().subscribe(data => {
        this.newUsers = data;
      });
    }
    this.connectedUser = JSON.parse(sessionStorage.getItem("user"));
  }
  
  //Création d'un nouveau groupe
  sendNewGroup() {
    console.log(this.group.nextNotificationDate)
    this.group.managerId = this.connectedUser._id;
    console.log(this.group.managerId)
    this.groupService.postGroup(this.group).subscribe(() => {
      this.toastrService.info('Votre groupe a bien été crée.', 'Envoyée');
      this.group = {
        managerId: "",
        name: "",
        nextNotificationDate: null
      };
    });
  }

  //Mise à jour d'un groupe existant
  editGroup() {
    this.groupService.updateGroup(this.group).subscribe(() => {
      this.toastrService.info('Votre groupe a bien été mis a jour.', 'Envoyée');
    });
  }

  //Ajout d'un utilisateur à un groupe (possible seulement lors de l'édition du groupe)
  addUserToGroup(user) {
    user.groups.push(this.group);
    //ajout dans la liste des membres du groupe
    this.usersInGroup.push(user);
    this.userService.updateUser(user).subscribe(() => {
      //retrait de la liste des potentiels membres du groupe
      let userToRemove = this.newUsers.findIndex(x => x._id == user._id);
      this.newUsers.splice(userToRemove, 1);
    });
  }

  //Suppression d'un utilisateur dans un groupe (possible seulement lors de l'édition du groupe)
  deleteUserFromGroup(user) {
    //retrait de la liste des membres du groupe
    let groupToRemove = user.groups.findIndex(x => x._id == this.groupId);
    user.groups.splice(groupToRemove, 1);
    this.userService.updateUser(user).subscribe(() => {
      let userToRemove = this.usersInGroup.findIndex(x => x._id == user._id);
      this.usersInGroup.splice(userToRemove, 1);
          //ajout dans la liste des potentiels membres du groupe
      this.newUsers.push(user);
    })
  }

}
