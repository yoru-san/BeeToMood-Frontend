import { Component, OnInit } from '@angular/core';
import { User } from '../user/shared/user';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  connectedUser: User;
  isEmployee: boolean;

  constructor() { }

  ngOnInit() {
    //Si l'utilisateur est un employé, il a seulement accès au reviews
    this.connectedUser = JSON.parse(sessionStorage.getItem("user"));
    if (this.connectedUser.type == "Employee")
      this.isEmployee = true;
    
  }

}
