import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchcourses',
  templateUrl: './searchcourses.component.html',
  styleUrls: ['./searchcourses.component.css']
})
export class SearchcoursesComponent implements OnInit {
  data = [];
  show = false;
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
    console.log(val);
    if (val.subject && val.course) {
      this.service.searchCourses(val.subject,val.course)
          .subscribe(
              (data) => {
                  this.data = data;
                  this.show=true;
                  console.log(data);
              }
          );
  } 
  }
}
