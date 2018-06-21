import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../shared/review.service';
import { Review } from '../shared/review';
import { User } from '../../user/shared/user';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  public BarChart:any;
  public reviews : Review;
  connectedUser: User;
  constructor(private reviewService : ReviewService) { }

  ngOnInit() {
    this.connectedUser = JSON.parse(sessionStorage.getItem('user'));
  console.log(this.connectedUser.groups);
    this.reviewService.getReview("groupId=" + this.connectedUser.groups).subscribe(data => {
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
    this.reviewService.getReview("")
  }

}
