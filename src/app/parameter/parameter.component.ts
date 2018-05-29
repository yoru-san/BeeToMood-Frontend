import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {

  newPassword : String;
  currentPassword : String;
  constructor() { }

  validePassword() {
    this.currentPassword = this.newPassword;
  }

  ngOnInit() {
  }

}
