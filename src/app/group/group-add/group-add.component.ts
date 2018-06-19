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
  users: User[];
  groupUsers: User[];
  
  constructor(
    private groupService: GroupService,
    private userService: UserService, 
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }
  
  ngOnInit() {
    this.group = {
      name: "",
      nextNotificationDate: {hour: 12, minute: 0}
    };

    this.groupId = this.activatedRoute.snapshot.params.id;
    if (!isNullOrUndefined(this.groupId)) {
      this.groupService.getGroup(this.groupId).subscribe(data => {
        this.group = data;

        let receivedMailHour = {
          hour: +data.nextNotificationDate.toString().split(':')[0],
          minute: +data.nextNotificationDate.toString().split(':')[1]
        }

        this.group.nextNotificationDate = receivedMailHour;
      });
    }

    console.log(this.groupId)
    this.userService.getUsers().subscribe(data => {
      data.forEach(user => {
        console.log("groups de l'user " + user.groups);
        //On cherche  une occurence dans le tableau de groupe de l'utilisateur avec le groupe actuel
        var userGroupIndex = user.groups.findIndex(x => x._id == this.groupId);
        console.log("index du group " + userGroupIndex);
        //Si une occurence est trouvé, on retire l'utilisateur des data avec son index
        if (userGroupIndex != -1) {
          var removedUser = user.groups.findIndex(x => x._id == user._id);
          console.log("index à retirer de data " + removedUser);
          data.splice(removedUser, 1);
          //On ajoute ensuite cet utilisateur dans un tableau de tout les utilisateurs de ce gropue
          this.groupUsers = [];
          this.groupUsers.push(user);
          console.log("user dans le bon group " + this.groupUsers);
        }
      });
      //Tout les autres utilisateurs sont affectés à un autre tableau
      this.users = data;
      console.log("les users pas dans le group " + this.users);
    });
  }
  
  sendNewGroup() {
    console.log(this.group.nextNotificationDate)
    this.groupService.postGroup(this.group).subscribe(() => {
      this.toastrService.info('Votre groupe a bien été crée.', 'Envoyée');
      this.group = {
        name: "",
        nextNotificationDate: null
      };
    });
  }

  editGroup() {
    this.groupService.updateGroup(this.group).subscribe(() => {
      this.toastrService.info('Votre groupe a bien été mis a jour.', 'Envoyée');
    });
  }

}
