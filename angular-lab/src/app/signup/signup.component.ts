import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form:FormGroup;
  emailSubject:String;
  link;
  email:String;
  token: String;

  constructor(private fb:FormBuilder, private service: AppService, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      username: ['',Validators.required],
      email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['',Validators.required]
  });
   }

  ngOnInit(): void {
  }

  get Email(){
    return this.form.get('email')
    }
  
    get UserName(){
    return this.form.get('username')
    }

    get Pswd(){
      return this.form.get('password')
    }

  signup(){
    const val = this.form.value;
    console.log(val);

    if (val.email && val.password && val.username) {
      this.authService.signup(val)
          .subscribe(
              (data) => {
                  console.log(data);
                  if(data.draftMail){
                    this.emailSubject = data.draftMail.subject;
                    this.link = data.draftMail.link;
                  }
                  if(data.email){
                    this.email = data.email;
                    console.log(this.email);
                  }
                  if(data.token){
                    this.token = data.token;
                    console.log(this.token);
                  }
              }
          );
  }
  else{
    alert("Please enter all the details");
  }  
  }

  onGoToPage(){
    window.location.href=this.link;
  }

}
