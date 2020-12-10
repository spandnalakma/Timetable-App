import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-searchwithkeywords',
  templateUrl: './searchwithkeywords.component.html',
  styleUrls: ['./searchwithkeywords.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchwithkeywordsComponent implements OnInit {

  data = [];
  reviews = [];
  show = false;
  expandedElement = null;
  columnsToDisplay = ['subject','catalog_nbr','className','class_section','ssr_component'];
  form: FormGroup;
  constructor(private fb: FormBuilder, private service: AppService, private router: Router) {
    this.form = this.fb.group({
      keyword: ['', [Validators.required,Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
  }

  search() {
    const val = this.form.value;
    if(!val.keyword || val.keyword.length<4){
      return alert("Enter keyword with min 4 characters")
    }
    if (val.keyword) {
      this.service.searchCourseswithKeywords(val.keyword)
          .subscribe(
              (data) => {
                  this.data = data;
                  if(this.data.length>0) this.show=true;
                  console.log(data);
              }
      ); 
  } 
  }

}
