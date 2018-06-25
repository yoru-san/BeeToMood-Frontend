import { Component, OnInit } from '@angular/core';
import { GroupService } from '../shared/group.service';
import { Group } from '../shared/group';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../user/shared/user';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  public group : Group;
  public groups : Group[]; 
  public connectedUser: User;
  constructor(private groupService: GroupService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(sessionStorage.getItem("user"));
    this.groupService.getGroups(this.connectedUser._id).subscribe(data => {
      this.groups = data;
    });

    this.group = {
      managerId: "",
      name: "",
      nextNotificationDate: null
    };
  }

  deleteGroup(groupId) {
    this.groupService.removeGroup(groupId).subscribe(data => {
      let groupIndexDeleted = this.groups.findIndex(x => x._id == data._id);
      this.groups.splice(groupIndexDeleted, 1);
      this.toastrService.info('Groupe ' + data.name + ' supprimé');
    });
  }
}
