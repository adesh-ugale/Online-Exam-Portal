import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { SiginupComponent } from './signup/siginup.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionComponent } from './question/question.component';
import { ScoreComponent } from './score/score.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'login',pathMatch:'full',
    },
    {
        path:'login',
        component:LoginComponent,
        
    },
    {
        path:'dashboard',
        component:DashboardComponent
    },
    {
        path:'layout',
        component:LayoutComponent
    },
    {
        path:'forgetpassword',
        component:ForgetpasswordComponent
    },
    {
        path:'registration',
        component:RegistrationComponent
    },
    {
        path:'welcome',
        component:WelcomeComponent
    },
    {
        path:'question',
        component:QuestionComponent
    },
    {
        path:'score',
        component:ScoreComponent
    }
   
];
