import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { ElementFinder } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  constructor(private fb:FormBuilder, private service: AppService, private router: Router, private authService:AuthService, private socialauth: SocialAuthService) {
    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
  });
   }

  ngOnInit(): void {
  
  }
  login(){
    const val = this.form.value;
    console.log(val);

         if (val.email && val.password) {
            this.authService.login(val)
                .subscribe(
                    (response) => {
                      if(response.responseObject){
                        this.authService.setSession(response);
                        console.log("User is logged in");
                        this.router.navigateByUrl('/');
                      }else if(response.message){
                         alert(response.message)
                      }
                    }
                );
        }  
  }

  signup(){
     this.router.navigateByUrl('/signup');
  }

  loginWithGoogle(){
    this.socialauth.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialauth.authState.subscribe((user) => {
      console.log(user);
      if(user.name){
        this.authService.goggleLogin(user.name).subscribe((data)=>{
          if(data.responseObject){
            this.authService.setSession(data);
            console.log("User is logged in");
            this.router.navigateByUrl('/');
          }
        })
      }
    });
  }

}
