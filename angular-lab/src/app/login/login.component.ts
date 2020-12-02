import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  constructor(private fb:FormBuilder, private service: AppService, private router: Router) {
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
            this.service.login(val)
                .subscribe(
                    () => {
                        console.log("User is logged in");
                        //this.router.navigateByUrl('/');
                    }
                );
        } 
  }

  signup(){
     this.router.navigateByUrl('/signup');
  }

}
