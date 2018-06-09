import { Component, OnInit } from '@angular/core';
import { GroupService } from '../shared/group.service';
import { Group } from '../shared/group';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  public groups : Group[];
  constructor(private groupService: GroupService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(data => {
      data.forEach(element => {
        element.nextNotificationDate = new Date(element.nextNotificationDate).getHours();
      });
      this.groups = data;
    });
    // this.groupService.postGroup().subscribe(data => {
    //   console.log("group ok");
    // });
  }

  deleteGroup(groupId) {
    this.groupService.removeGroup(groupId).subscribe(data => {
      let groupIndexDeleted = this.groups.findIndex(x => x._id == data._id);
      this.groups.splice(groupIndexDeleted, 1);
      this.toastrService.success('Groupe ' + data.name + ' supprimé')

      
    });
  }

}
