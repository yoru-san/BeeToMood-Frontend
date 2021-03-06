import { Component, OnInit } from '@angular/core';
import { ParameterService } from './shared/parameter.service';
import { ToastrService } from 'ngx-toastr';
import * as shajs from 'sha.js';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {
  
  newPassword: string;
  private sessionUser;
  constructor(private parameterService: ParameterService, private toastrService: ToastrService) {}
  
  ngOnInit() {
  }
  
  //On hash le nouveau mot de passe avant de le stocker en base
  validatePassword() {
    console.log("changer le mdp")
    this.sessionUser = JSON.parse(sessionStorage.getItem('user'));
    this.newPassword = shajs('sha256').update(this.newPassword).digest('hex');

    this.parameterService.updatePassword(this.sessionUser._id, this.newPassword).subscribe(() => {
      this.toastrService.info('Votre mot de passe a bien été modifié.', 'Réussite');
      this.newPassword = "";
    }, () => {
      this.toastrService.error('Votre mot de passe n\'a pas pu être modifié.', 'Erreur');
      this.newPassword = "";
    });
  } 
}