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
      this.toastrService.info('Envoyée', 'Votre groupe a bien été crée.');
      this.group = {
        name: "",
        nextNotificationDate: null
      };
    });
  }

}
