import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router,ActivatedRoute } from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  name;
  Object = Object;
  timetble:any[];
  columnsToDisplay = ['year','subject','catalog_nbr','class_nbr','start_time','end_time','campus','days','class_section','ssr_component'];
  constructor(private service: AppService, private router: Router, private authService: AuthService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    this.timetable(this.name);
  }
  timetable(name){
    this.service.getUserTimetableForSchedules(name).subscribe((data)=>{
      this.sortTimeTable(data);
      this.timetble = data;  
    })
  }
  sortTimeTable(data):any[]{
    for (let key of Object.keys(data)){
      let c_list = [];
      c_list = data[key];
      data[key] = c_list.sort(this.sortData);
    }
    return data;
  }

  sortData(course1,course2){
    var subjectCompared = compare(course1.subject, course2.subject);
    var courseCompared = compare(course1.catalog_nbr, course2.catalog_nbr);
    var yearCompared = compare(course1.year,course2.year);
   
    if(yearCompared !== 0){
      return yearCompared;
    }
    
    if(subjectCompared !== 0){
        return subjectCompared;
    }
   
    if(courseCompared !== 0){
      return courseCompared;
    }
    return 0;
  }
}

function compare(value1: number | string, value2: number | string) {
  if(value1 < value2){
    return -1;
  }
  if(value1 > value2){
    return 1;
  }
  return 0;
}
