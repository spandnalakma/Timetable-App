import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
  subject;
  course;
  constructor(private fb: FormBuilder,private router:Router, private service:AppService,private authService:AuthService,public dialog: MatDialog) {
    this.form = this.fb.group({
      subject: ['', Validators.required],
      course: ['', Validators.required],
      review: ['', Validators.required]
    });

    if(this.router.getCurrentNavigation().extras.state){
      this.state = this.router.getCurrentNavigation().extras.state;
      if(this.state){
        this.subject = this.state.subject;
        this.course = this.state.course;
        this.form.patchValue({subject:this.state.subject, course:this.state.course});
        this.form.controls["subject"].disable();
        this.form.controls["course"].disable();
      }
    } 
   }

  ngOnInit(): void {
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        this.save();
      }
    });
  }

  save(){
    const val = this.form.value;
    if(val.review){
    let resObject={"subject":this.subject,"course":this.course,"comments":val.review,"username":this.authService.getUserName()};
    this.service.createReview(resObject).subscribe((data)=>{
      console.log(data);
    })
  }
  }


}
