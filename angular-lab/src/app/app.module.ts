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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SearchcoursesComponent,
    CourselistComponent,
    SearchwithkeywordsComponent,
    CreatecourselistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialuiModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
