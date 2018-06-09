import { Component, OnInit } from '@angular/core';
import { GroupService } from '../shared/group.service';
import { Group } from '../shared/group';
import * as moment from 'moment';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  public groups : Group;
  constructor(private groupService : GroupService) { }

  ngOnInit() {
    this.groupService.getGroup().subscribe(data => {
      data.forEach(element => {
        element.nextNotificationDate = new Date(element.nextNotificationDate).getHours();
      });
      this.groups = data;
    });
    // this.groupService.postGroup().subscribe(data => {
    //   console.log("group ok");
    // });
  }

  // deleteGroup(groupId) {
  //   this.groupService.removeGroup(groupId);
  // }

}
