import { Component, OnInit } from '@angular/core';
import { ParameterService } from './shared/parameter.service';
import { ToastrService } from 'ngx-toastr';
import * as shajs from 'sha.js';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.css']
})
export class ParameterComponent implements OnInit {
  
  newPassword : String;
  currentPassword : String;
  constructor(private parameterService: ParameterService, private toastrService: ToastrService) {}
  
  ngOnInit() {
  }
  
  validatePassword() {
    this.currentPassword = this.newPassword;
    this.newPassword = shajs('sha256').update(this.newPassword).digest('hex');

    this.parameterService.updatePassword(this.newPassword).subscribe(data => {
      this.toastrService.success('Réussite', 'Votre mot de passe a bien été modifié.');
    }, (error) => {
      this.toastrService.error('Erreur', 'Votre mot de passe n\'a pas pu être modifié.');
    });
  }
  
}