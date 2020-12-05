import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coursesreview',
  templateUrl: './coursesreview.component.html',
  styleUrls: ['./coursesreview.component.css']
})
export class CoursesreviewComponent implements OnInit {
  dataSource = [];
  columnsToDisplay:string[] = ["subject","catalog_nbr","checked"];

  constructor(private service:AppService, private router: Router) { }

  ngOnInit(): void {
    this.service.getSubjectandCourseCodePairs().subscribe((data)=>{
      console.log(data);
      this.dataSource = data;
    })
  }

  addreview(i){
     return this.router.navigateByUrl('/addreview')
  }

}
