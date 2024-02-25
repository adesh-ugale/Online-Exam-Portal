import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  usernameBrower:any='';

  userDB:User=new User(this.usernameBrower,'','');

  constructor(private httpClient:HttpClient,private route:Router)
  {
    
  }
  ngOnInit(): void {
    
    this.usernameBrower=sessionStorage.getItem("username");
    this.userDB.username=this.usernameBrower;
    console.log(this.usernameBrower);
  }

  update()
  {
    console.log(this.userDB.username);

    this.httpClient.post<boolean>("http://localhost:8080/resetPassword",this.userDB).subscribe(answer=>{

    if(answer)
    {
      alert("Updated your password");
      this.route.navigateByUrl('/login');
    }
    else
    {
        alert("Password is not matched");
    }
    })
  }


}

export class User
{
  username:string;
  password1:string;
  password2:string;
  
  constructor(username:string,password1:string,password2:string)
  {
      this.username=username;
      this.password1=password1
      this.password2=password2;
  }
}
