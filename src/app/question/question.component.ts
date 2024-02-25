import { Component, NgModule, OnInit } from '@angular/core';
import { Question, QuestionService, Answer } from '../question.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-question',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit
{
  subject:any="";
  username:any="";
  submittedAnswer:any="";
  totalScore:number | undefined;
  // i:number=0;
  selected:boolean=false;
  remainingTime=121;
  examDuration:any;

  
  answer:Answer=new Answer(0,'','','');
  question:Question=new Question(0,'','','','','','','');

  allAnswers:Answer[]=[];

  
  constructor(private questionService : QuestionService,private route:Router)
  {
    
  }
  
  ngOnInit(): void 
  {
    this.subject=sessionStorage.getItem("subject");
    console.log(this.subject);
    this.questionService.getFirstQuestion(this.subject).subscribe(question=>this.question=question);

    setInterval(()=>{

      this.remainingTime=this.remainingTime-1;
      let minutes=Math.floor(this.remainingTime/60);
      let seconds=this.remainingTime%60;

      this.examDuration="Time Remaining is "+minutes+":"+seconds;

      if(this.remainingTime==0)
      {
        this.endExam();
      }

    },1000)
  }

  nextQuestion()
  {
    this.selected=false;
    this.questionService.nextQuestion().subscribe(question=>this.question=question);


  }

  previousQuestion()
  {
    this.selected=false;

    this.questionService.getAllAnswers().subscribe(answerarray=>this.allAnswers=answerarray);

    this.questionService.previousQuestion().subscribe(question=>this.question=question);
  }

  getColor(currentOption:string)
  {
      
      for (let index = 0; index < this.allAnswers.length; index++) 
      {
        let answer = this.allAnswers[index];

        if(answer.qno==this.question.qno && answer.submittedAnswer==currentOption)
          return "green";
        

      }    
      
      return "red";
  }


  isChecked(currentOption:string)
  {
      
      for (let index = 0; index < this.allAnswers.length; index++) 
      {
        let answer = this.allAnswers[index];

        if(answer.submittedAnswer==currentOption)
          return true;
        

      }    
      
      return false;
  }

  saveAnswer()
  {
    this.answer.submittedAnswer=this.submittedAnswer;
    this.answer.correctAnswer=this.question.answer;
    this.answer.qno=this.question.qno;
    this.answer.qtext=this.question.qtext;

    this.questionService.saveAnswer(this.answer).subscribe();

    console.log(this.question.answer);
    console.log("Answer submitted");
  }

  endExam()
  {
  
        // console.log("value in session storage is"+totalScore);
        // sessionStorage.setItem("totalScore",totalScore+"");
        this.route.navigate(['score']);
  }

}
