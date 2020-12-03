import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {
  title;
  constructor(private appService:AppService, private router:Router) { }

  ngOnInit(): void {
      this.appService.test().subscribe(
        (data) => {
            this.title = data; 
            console.log(data);
        }
    );
  }

}
