import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent implements OnInit {

  message:any="";
  usernameBrower:string='';

  constructor(private httpClient:HttpClient,private route:Router)
  {

  }
  ngOnInit(): void {
    this.message=sessionStorage.getItem(this.usernameBrower);
  }

  onForget()
  {
    this.httpClient.get("http://localhost:8080/forgetPassword/"+this.usernameBrower).subscribe(answer=>{

    if(answer)
    {
      this.route.navigateByUrl('/dashboard');
      sessionStorage.setItem("username",this.usernameBrower);
    }
     else
     {
         alert("Username Not Found");
     }
    })
   
  }
 
}
