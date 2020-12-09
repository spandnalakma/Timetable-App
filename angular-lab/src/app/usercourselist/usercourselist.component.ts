import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usercourselist',
  templateUrl: './usercourselist.component.html',
  styleUrls: ['./usercourselist.component.css']
})
export class UsercourselistComponent implements OnInit {
  courselists = []
  username:String;
  element;
  constructor(private service: AppService, private router: Router,private authService: AuthService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.username = this.authService.getUserName();
    this.getCoursLists();    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        this.delete(this.element);
      }
    });
  }

  getElement(element){
    this.element = element;
    console.log(this.element);
  }

  getCoursLists(){
    this.service.getUserCourseLists(this.username).subscribe((data)=>{
      this.courselists = data;
    })
  }

  delete(element){
    console.log(element);
    this.service.deleteCourseList(element.name).subscribe((data)=>{
      console.log(data);
    })
    this.getCoursLists();
  }

  update(event,element){
    this.router.navigateByUrl(`/updatecourselist/${element.name}`)
    //this.form.patchValue({coursename:element.name, description:element.description})
  }

}
