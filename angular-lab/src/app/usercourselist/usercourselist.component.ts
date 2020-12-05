import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-usercourselist',
  templateUrl: './usercourselist.component.html',
  styleUrls: ['./usercourselist.component.css']
})
export class UsercourselistComponent implements OnInit {
  courselists = []
  username:String;
  constructor(private service: AppService, private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUserName();
    this.getCoursLists();    
  }

  getCoursLists(){
    this.service.getUserCourseLists(this.username).subscribe((data)=>{
      this.courselists = data;
    })
  }

  delete(event,element){
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
