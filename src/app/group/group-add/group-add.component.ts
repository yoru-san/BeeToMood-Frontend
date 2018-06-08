import { Component, OnInit } from '@angular/core';
import { Group } from '../shared/group';
import { GroupService } from '../shared/group.service';
import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.css']
})
export class GroupAddComponent implements OnInit {

  group : Group;
  
  constructor(private groupService: GroupService, private toastrService : ToastrService) { }
  
  ngOnInit() {
    this.group = {
      name: "",
      nextNotificationDate: null
    };
  }
  
  sendNewGroup() {
    console.log(this.group.nextNotificationDate)
    this.groupService.postGroup(this.group).subscribe(data => {
      this.toastrService.success('Envoyée', 'Votre groupe a bien été envoyé.');
      this.group = {
        name: "",
        nextNotificationDate: null
      };
    });
  }

}
