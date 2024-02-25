import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  
  user:User=new User('','',0,'');

  constructor(private httpClient:HttpClient,private route:Router)
  {

  }

  onRegister()
  {
    this.httpClient.post<Boolean>("http://localhost:8080/saveToDB",this.user).subscribe(message=>{

    if(message)
    {
      alert("Registration Successfully");
      this.route.navigateByUrl('/login');
    }
    else{
      alert("Somthing is wrong at brower side");
    }
    });
    
  }
}
export class User
{
  username:string;
  password:string;
  mobno:number;
  emailid:string;

  constructor(username:string,password:string,mobno:number,emailid:string)
  {
    this.username=username;
    this.password=password;
    this.mobno=mobno;
    this.emailid=emailid;
  }
}
