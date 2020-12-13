import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dataSource=[];
  reviewsList = []
  columnsToDisplay:string[] = ["username","email","deactivated","isAdmin","update"];
  displayColumns:string[] = ["username","course","subject","comments","hidden","update"]
  constructor(private service:AppService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getReviews();
  }

  getUsers(){
    this.service.getUsers().subscribe((data)=>{
      this.dataSource=data;
    })
  }

  getReviews(){
    this.service.getReviews().subscribe((data)=>{
      this.reviewsList = data;
      console.log(this.reviewsList);
    })
  }

  update(index){
    let resObject;
    console.log(this.dataSource[index].deactivated,this.dataSource[index].isAdmin);
    resObject={"isAdmin":this.dataSource[index].isAdmin,"deactivated":this.dataSource[index].deactivated};
    this.service.updateUserStatus(this.dataSource[index].username,resObject).subscribe((data)=>{
      console.log(data);
      alert(data.message);
    })
    this.getUsers();
  }

  saveReviewStatus(index){
    let resObject;
    console.log(this.reviewsList[index].hidden, this.reviewsList[index].subject,this.reviewsList[index].course);
    resObject = {"hidden":this.reviewsList[index].hidden};
    this.service.updateReviewStatus(this.reviewsList[index]._id,resObject).subscribe((data)=>{
      console.log(data);
      alert(data.message);  //this.reviewsList[index].subject,this.reviewsList[index].course,
    })
    this.getReviews();
  } 

}
