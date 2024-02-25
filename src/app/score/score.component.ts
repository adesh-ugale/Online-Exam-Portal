import { Component, OnInit } from '@angular/core';
import { Answer, QuestionService } from '../question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements OnInit{

  score:number=0;
  allAnswers:Answer[]=[];

  constructor(private questionService:QuestionService, private router:Router,private httpClient:HttpClient)
  {

  }

  ngOnInit(): void 
  {
    this.questionService.getAllAnswers().subscribe(answerarray=>this.allAnswers=answerarray);
    this.questionService.calculateScore().subscribe(score=>this.score=score);
  
  }

  getColor(submittedAnswer:string,originalAnswer:string)
  {
    if(submittedAnswer==originalAnswer)
      return "green";
    else
      return "red";
  }

  getHome()
  {
    this.router.navigateByUrl('login');
  }

}
