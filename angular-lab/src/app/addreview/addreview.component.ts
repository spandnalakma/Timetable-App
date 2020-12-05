import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent implements OnInit {
  state: any;
  form: FormGroup;
  constructor(private fb: FormBuilder,private router:Router, private service:AppService,private authService:AuthService) {
    this.form = this.fb.group({
      subject: ['', Validators.required],
      course: ['', Validators.required],
      review: ['', Validators.required]
    });

    if(this.router.getCurrentNavigation().extras.state){
      this.state = this.router.getCurrentNavigation().extras.state;
      if(this.state){
        console.log(this.state);
        this.form.patchValue({subject:this.state.subject, course:this.state.course})
      }
    } 
   }

  ngOnInit(): void {
  }

  save(){
    const val = this.form.value;
    if(val.review){
    let resObject={"subject":val.subject,"course":val.course,"comments":val.review,"username":this.authService.getUserName()};
    this.service.createReview(resObject).subscribe((data)=>{
      console.log(data);
    })
  }
  }

}
