import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {
  data = []
  constructor(private appService:AppService, private router:Router) { }

  ngOnInit(): void {
      this.appService.getpublicCourseLists().subscribe(
        (data) => {
            this.data = data;
            console.log(data);
        }
    );
  }

}
