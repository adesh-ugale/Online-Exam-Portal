import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient:HttpClient) {

  }

  getFirstQuestion(subject:string)
  {
    return this.httpClient.get<Question>("http://localhost:8080/getFirstQuestion/"+subject);
  }

  nextQuestion()
  {
    return this.httpClient.get<Question>("http://localhost:8080/nextQuestion");
  }

  previousQuestion()
  {
    return this.httpClient.get<Question>("http://localhost:8080/previousQuestion");
  }

  saveAnswer(answer:Answer)
  {
    return this.httpClient.post<void>("http://localhost:8080/saveAnswer",answer);
  }

  endExam()
  {
    return this.httpClient.get<number>("http://localhost:8080/calculateScore");
  }
  getAllAnswers()
  {
    return this.httpClient.get<Answer[]>("http://localhost:8080/getAllAnswer");
  }

  calculateScore()
  {
    return this.httpClient.get<number>("http://localhost:8080/calculateScore");

    // [ 10 subscribe() ] Observable object
    // [ 10 get() ] ArrayList object
    

  }
}

export class Question
{
  qno:number;
  qtext:string;
  op1:string;
  op2:string;
  op3:string;
  op4:string;
  answer:string;
  subject:string;

  constructor(qno:number,qtext:string,op1:string,op2:string,op3:string,op4:string,answer:string,subject:string)
  {
    this.qno=qno;
    this.qtext=qtext;
    this.op1=op1;
    this.op2=op2;
    this.op3=op3;
    this.op4=op4;
    this.answer=answer;
    this.subject=subject;
  }
}

export class Answer
{
  qno:number;
  submittedAnswer:string;
  qtext:string;
  correctAnswer:string;

  constructor(qno:number,submittedAnswer:string,qtext:string,correctAnswer:string)
  {
    this.qno=qno;
    this.submittedAnswer=submittedAnswer;
    this.qtext=qtext;
    this.correctAnswer=correctAnswer;
  }
}
