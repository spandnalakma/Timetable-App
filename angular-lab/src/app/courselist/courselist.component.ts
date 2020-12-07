import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {
  data = [];
  timetable = [];
  show = false;
  constructor(private appService:AppService, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
      let userName = this.authService.getUserName();
      console.log(userName);
      this.appService.getpublicCourseLists(userName).subscribe(
        (data) => {
            this.data = data;
            console.log(data);
        }
    );
  }

  search(item){
    console.log(item);
    this.appService.searchCourses(item.subject,item.course)
          .subscribe(
              (data) => {
                  this.timetable = data;
                  this.show = true;
                  console.log(data);
              }
          );

  }

}
