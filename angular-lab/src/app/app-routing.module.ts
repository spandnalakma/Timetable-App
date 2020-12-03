import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SearchcoursesComponent} from './searchcourses/searchcourses.component';
import {CourselistComponent} from './courselist/courselist.component';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'coursesearch',component:SearchcoursesComponent},
  {path:'courselist',component:CourselistComponent, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [BrowserModule,BrowserAnimationsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }