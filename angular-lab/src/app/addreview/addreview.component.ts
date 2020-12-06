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
  openReviews = [];
  columnsToDisplay = ["username","subject","course","comments"]
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
        this.form.patchValue({subject:this.state.subject, course:this.state.course});
        this.form.controls["subject"].disable();
        this.form.controls["course"].disable();
      }
    } 

    this.getOpenReviews(this.state.subject,this.state.course);
   }

  ngOnInit(): void {
    
  }

  getOpenReviews(subject,course){
    this.service.getOpenReview(subject,course).subscribe((data)=>{
      this.openReviews = data;
      console.log(data)
    })
  }

  save(){
    const val = this.form.value;
    if(val.review){
    let resObject={"subject":val.subject,"course":val.course,"comments":val.review,"username":this.authService.getUserName()};
    this.service.createReview(resObject).subscribe((data)=>{
      console.log(data);
    })
  }
  this.getOpenReviews(val.subject,val.course);
  }


}
