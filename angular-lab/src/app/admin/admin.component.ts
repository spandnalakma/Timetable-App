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
  displayColumns:string[] = ["username","course","subject","comments","hide","update"]
  constructor(private service:AppService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.service.getUsers().subscribe((data)=>{
      this.dataSource=data;
      console.log(data);
    })
  }

  getReviews(){
    this.service.getReviews().subscribe((data)=>{
      this.reviewsList = data;
      console.log(data);
    })
  }

  update(index){
    let resObject;
    console.log(this.dataSource[index].deactivated,this.dataSource[index].isAdmin);
    resObject={"isAdmin":this.dataSource[index].isAdmin,"deactivated":this.dataSource[index].deactivated};
    this.service.updateUserStatus(this.dataSource[index].username,resObject).subscribe((data)=>{
      console.log(data);
    })
    this.getUsers();
  }

}
