import { Component, OnInit } from '@angular/core';
import { Review } from '../shared/review';
import { ReviewService } from '../shared/review.service';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../../group/shared/group';
import { GroupService } from '../../group/shared/group.service';
import * as moment from 'moment';
import { User } from '../../user/shared/user';
import { ActivatedRoute, Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.scss']
})
export class ReviewAddComponent implements OnInit {

  review: Review;
  connectedUser: User;
  userGroup: Group[] = [];
  groupId;

  constructor(
    private reviewService : ReviewService, 
    private toastrService : ToastrService, 
    private groupService: GroupService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //Récupération des groupes de l'utilisateur pour qu'il puisse choisir le groupe correspondant à la review
    this.connectedUser = JSON.parse(sessionStorage.getItem('user'));
    this.groupId = this.activatedRoute.snapshot.params.id;
      this.connectedUser.groups.forEach(g => {
        this.groupService.getGroup(g).subscribe(data => {
          this.userGroup.push(data);
        });
      });
    
    this.review = {
      group: "",
      userId: "",
      mood: "",
      comment: "",
      date: null
    };
  }

  //Envoi d'une nouvelle review
  sendNewReview() {
    this.review.date = moment().format("MMM Do YY");
    this.review.userId = this.connectedUser._id;
    this.review.group = this.groupId;
    this.reviewService.postReview(this.review).subscribe(() => {
      this.toastrService.info('Envoyée', 'Votre review a bien été envoyée.');
      this.route.navigate(["/member"]);

      this.review = {
        group: "",
        userId: "",
        mood: "",
        comment: "",
        date: null
      };
    });
  }
}
