import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SearchcoursesComponent} from './searchcourses/searchcourses.component';
import {CourselistComponent} from './courselist/courselist.component';
import {AuthGuard} from './auth/auth.guard';
import {SearchwithkeywordsComponent} from './searchwithkeywords/searchwithkeywords.component';
import {CreatecourselistComponent} from './createcourselist/createcourselist.component';
import {UsercourselistComponent} from './usercourselist/usercourselist.component';
import { AuthService } from './auth/auth.service';
import {AddreviewComponent} from './addreview/addreview.component';
import {CoursesreviewComponent} from './coursesreview/coursesreview.component';
import {AdminComponent} from './admin/admin.component';
import {TimetableComponent} from './timetable/timetable.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'coursesearch',component:SearchcoursesComponent},
  {path:'courselist',component:CourselistComponent} , //canActivate:[AuthGuard]
  {path:'searchwithkeywords',component:SearchwithkeywordsComponent},
  {path:'createcourselist',component:CreatecourselistComponent, canActivate:[AuthGuard]},
  {path:'updatecourselist/:id',component:CreatecourselistComponent, canActivate:[AuthGuard]},
  {path:'usercourselist', component:UsercourselistComponent, canActivate:[AuthGuard]},
  {path:'addreview',component:AddreviewComponent, canActivate:[AuthGuard]},
  {path:'coursesreview',component:CoursesreviewComponent, canActivate:[AuthGuard]},
  {path:'admin',component:AdminComponent, canActivate:[AuthGuard]},
  {path:'timetable/:name',component:TimetableComponent}
];

@NgModule({
  declarations: [],
  imports: [BrowserModule,BrowserAnimationsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
