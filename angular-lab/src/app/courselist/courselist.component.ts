import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CourselistComponent implements OnInit {
  data = [];
  timetable = [];
  show = false;
  columnsToDisplay = ['name','userName','numberofcourses','timetable'];
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

  viewTimetable(name){
    this.router.navigateByUrl(`/timetable/${name}`);
  }

}
