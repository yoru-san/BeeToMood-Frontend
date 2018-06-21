import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../shared/review.service';
import { Review } from '../shared/review';
import * as Chart from 'chart.js';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  public BarChart:any;
  public reviews : Review[];
  connectedUser;

  constructor(
    private reviewService: ReviewService, 
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(sessionStorage.getItem('user'));

  console.log(this.connectedUser.groups);
    this.reviewService.getReviews(this.connectedUser.groups[0]).subscribe(data => {
      console.log(data)
      this.reviews = data;
    });
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data:{
        labels:["Journée difficile","Mauvaise journée","Journée normale","Bonne journée","Très bonne journée"],
        datasets:[{ 
          label:'# vote',
          data:[
            2,
            5,
            3,
            7,
            6
          ],
          backgroundColor:[
            'rgba(244, 66, 66,0.3)', 
            'rgba(244, 184, 65,0.3)',
            'rgba(251, 255, 28,0.3)',
            'rgba(7, 170, 234,0.3)',
            'rgba(94, 229, 105,0.3)',

          
          ]
        }]
      },
      options:{
        title:{
          texte:"Bar Chart",
          display:true
        },
        scales:{
          yAxes:[{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }

  checkUserReviews() {
    console.log("User review")
    let alreadyNotified = false;
    this.reviewService.getReview(this.connectedUser.id).subscribe(data => {
      data.forEach(review => {
        if (alreadyNotified) return;

        if (review.date == moment().format("MMM Do YY")) {
          this.toastrService.error("Impossible d'envoyer 2 reviews le même jour", "Erreur");
          alreadyNotified = true;
          return;
        }
      });

      if (!alreadyNotified)
        this.router.navigate(["review/add"]);
    });
  }
}
