import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../shared/review.service';
import { Review } from '../shared/review';
import * as Chart from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  
  groupId;
  isAdmin: boolean;
  public BarChart:any;
  public reviews : Review[];
  connectedUser;
  amazingMoods: number = 0;
  goodMoods: number = 0;
  normalMoods: number = 0;
  badMoods: number = 0;
  dificultMoods: number = 0;
  allMoods: number[] = [];
  
  constructor(
    private reviewService: ReviewService, 
    private activatedRoute: ActivatedRoute,
  ) { }
  
  ngOnInit() {
    let moods = [
      {name: "amazing", number: 0 },
      {name: "good", number: 0 },
      {name: "normal", number: 0 },
      {name: "bad", number: 0 },
      {name: "difficult", number: 0 } 
    ];
    
    this.connectedUser = JSON.parse(sessionStorage.getItem('user'));
    this.groupId = this.activatedRoute.snapshot.params.id;
    if (!(isNullOrUndefined(this.groupId))) {
      //Vision du Manager
      this.isAdmin = true;
      this.reviewService.getReviews(this.groupId).subscribe(data => {
        this.reviews = data;

        data.map(review => {
          let changingMood = moods.find(mood => mood.name === review.mood);
          changingMood.number++;
        });
        
        this.allMoods = moods.map(mood => mood.number).reverse();
        
        this.initializeChart();
      });
    } else {
      //Vision de l'employé
      this.reviewService.getReviews(this.connectedUser.groups[0]).subscribe(data => {
        this.reviews = data;
        
        data.map(review => {
          let changingMood = moods.find(mood => mood.name === review.mood);
          changingMood.number++;
        });
        
        this.allMoods = moods.map(mood => mood.number).reverse();


        
        this.initializeChart();
      });
    }
  }
  
  //initialisation du graphique
  initializeChart() {
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data:{
        labels:["Journée difficile","Mauvaise journée","Journée normale","Bonne journée","Très bonne journée"],
        datasets:[{ 
          label:'# vote',
          data: this.allMoods,
          backgroundColor:[
            'rgba(244, 66, 66,0.3)', 
            'rgba(244, 184, 65,0.3)',
            'rgba(251, 255, 28,0.3)',
            'rgba(7, 170, 234,0.3)',
            'rgba(94, 229, 105,0.3)'
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
              beginAtZero:true,
              min:0,
              max: this.allMoods.length
            }
          }]
        }
      }
    });
  }
}
