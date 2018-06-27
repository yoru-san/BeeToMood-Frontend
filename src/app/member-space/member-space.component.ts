import { Component, OnInit, group } from '@angular/core';
import { Group } from '../group/shared/group';
import { User } from '../user/shared/user';
import { UserService } from '../user/shared/user.service';
import * as moment from 'moment';
import { ReviewService } from '../review/shared/review.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-member-space',
  templateUrl: './member-space.component.html',
  styleUrls: ['./member-space.component.scss']
})
export class MemberSpaceComponent implements OnInit {
  groups: Group[] = [];
  connectedUser: User

  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(sessionStorage.getItem('user'));
    this.userService.getUser(this.connectedUser._id).subscribe(data => {
      data.groups.forEach(g => {
        this.groups.push(g);
      });
    })    

  }

    //Vérification que l'utilisateur n'a pas déjà envoyé une review aujourd'hui
    checkUserReviews(groupId) {
      let alreadyNotified = false;
      this.reviewService.getReview(this.connectedUser._id).subscribe(data => {
        data.forEach(review => {
          if (alreadyNotified) return;
          if (review.group == groupId) {
            if (review.date == moment().format("MMM Do YY")) {
              this.toastrService.error("Impossible d'envoyer 2 reviews le même jour", "Erreur");
              alreadyNotified = true;
              return;
            }
          }
        
        });
        
        if (!alreadyNotified)
          this.router.navigate(["/", "review", "add", groupId]);
      });
    }

}
