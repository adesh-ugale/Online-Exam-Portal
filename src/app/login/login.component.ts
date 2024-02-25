import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  userDB:UserDB;
  usernameFromBrower:any;
  message: string | null | undefined;

  constructor(private httpClient:HttpClient,private route:Router)
  {
    this.userDB=new UserDB();
  }
  ngOnInit(): void {
    
   
  }

  onLogin()
  {
      this.httpClient.post("http://localhost:8080/validate",this.userDB).subscribe(message=>{

      if(message==true)
      {
      
        alert("Login Successful");
        sessionStorage.setItem("username",this.userDB.username);
        console.log(this.usernameFromBrower);
        this.route.navigate(['/welcome']);
      }
      else if(message==false)
      {
          alert("Wrong Username OR Password!");
      }
      else
      {
        alert("Username OR Password is Mandatary to fill");
      }
      }
      )
  }
  onRegister()
  {
    this.route.navigateByUrl('/registration');
  }

  onForgetPassword()
  {
    this.route.navigateByUrl('/forgetpassword');
  }

}
export class UserDB
{
    username:string;
    password:string;
    
    constructor()
    {
        this.username='';
        this.password='';
    }
}