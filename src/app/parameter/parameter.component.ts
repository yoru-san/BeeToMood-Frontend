import { Component, OnInit } from '@angular/core';
import * as shajs from 'sha.js';

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
    this.newPassword = shajs('sha256').update(this.newPassword).digest('hex');
    console.log(this.newPassword);
  }

  ngOnInit() {
  }

}
