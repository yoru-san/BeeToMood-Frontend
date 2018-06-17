import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../shared/group';
import { GroupService } from '../shared/group.service';
import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {

  groupId: string;
  group: Group;
  
  constructor(
    private groupService: GroupService, 
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
