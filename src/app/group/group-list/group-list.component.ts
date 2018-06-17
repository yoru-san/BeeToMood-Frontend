import { Component, OnInit } from '@angular/core';
import { GroupService } from '../shared/group.service';
import { Group } from '../shared/group';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  public group : Group;
  public groups : Group[];  
  constructor(private groupService: GroupService, private toastrService: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(data => {
      this.groups = data;
    });

    this.group = {
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
