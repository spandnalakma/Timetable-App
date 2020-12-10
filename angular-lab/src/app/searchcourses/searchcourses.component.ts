import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-searchcourses',
  templateUrl: './searchcourses.component.html',
  styleUrls: ['./searchcourses.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchcoursesComponent implements OnInit {
  data = [];
  reviews = [];
  showReviews = false;
  columnsToDisplay = ['subject','catalog_nbr','className','class_section','ssr_component']
  form: FormGroup;
  constructor(private fb: FormBuilder, private service: AppService, private router: Router) {
    this.form = this.fb.group({
      subject: ['', Validators.required],
      course: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  search() {
    const val = this.form.value;
    if(!val.subject || !val.course){
      return alert("Please enter subject and course code");
    }
    if (val.subject && val.course) {
      this.service.searchCourses(val.subject,val.course)
          .subscribe(
              (data) => {
                  this.data = data;
                  console.log(data);
              }
          );
  } 
  }
}
