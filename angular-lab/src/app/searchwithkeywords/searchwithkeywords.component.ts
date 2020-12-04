import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchwithkeywords',
  templateUrl: './searchwithkeywords.component.html',
  styleUrls: ['./searchwithkeywords.component.css']
})
export class SearchwithkeywordsComponent implements OnInit {

  data = [];
  show = false;
  form: FormGroup;
  constructor(private fb: FormBuilder, private service: AppService, private router: Router) {
    this.form = this.fb.group({
      keyword: ['', Validators.required,Validators.minLength(4)]
    });
  }

  ngOnInit(): void {
  }

  search() {
    const val = this.form.value;
    console.log(val);
    if (val.keyword) {
      this.service.searchCourseswithKeywords(val.keyword)
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
