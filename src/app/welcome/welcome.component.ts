import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

  subject:any;
  username:any;

  ngOnInit(): void 
  {
  
    this.username=sessionStorage.getItem("username");
    
  }
  constructor(private route:Router)
  {

  }

  onStart()
  {
    sessionStorage.setItem("subject",this.subject);
    console.log(this.subject);
    this.route.navigate(['/question']);
  }

}