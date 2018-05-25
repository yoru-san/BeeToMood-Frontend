import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user : User;

  constructor() { }

  ngOnInit() {
  }

}
