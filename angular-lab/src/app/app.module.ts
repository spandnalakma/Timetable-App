import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialuiModule } from './materialui/materialui.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchcoursesComponent } from './searchcourses/searchcourses.component';
import { CourselistComponent } from './courselist/courselist.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SearchwithkeywordsComponent } from './searchwithkeywords/searchwithkeywords.component';
import { CreatecourselistComponent } from './createcourselist/createcourselist.component';
import { UsercourselistComponent } from './usercourselist/usercourselist.component';
import { AddreviewComponent } from './addreview/addreview.component';
import { CoursesreviewComponent } from './coursesreview/coursesreview.component';
import { AdminComponent } from './admin/admin.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TimetableComponent } from './timetable/timetable.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SearchcoursesComponent,
    CourselistComponent,
    SearchwithkeywordsComponent,
    CreatecourselistComponent,
    UsercourselistComponent,
    AddreviewComponent,
    CoursesreviewComponent,
    AdminComponent,
    ConfirmationDialogComponent,
    TimetableComponent,
    EmailVerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialuiModule,
    SocialLoginModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '503303147730-e7l7nhdah9kck5qonfuihi83s3casqo6.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
