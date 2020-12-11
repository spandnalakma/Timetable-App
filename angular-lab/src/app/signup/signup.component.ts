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
  constructor(private fb:FormBuilder, private service: AppService, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      username: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
  });
   }

  ngOnInit(): void {
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
              }
          );
  }  
  }

}
