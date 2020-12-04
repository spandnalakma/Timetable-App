import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-createcourselist',
  templateUrl: './createcourselist.component.html',
  styleUrls: ['./createcourselist.component.css']
})
export class CreatecourselistComponent implements OnInit {
  data = [];
  show = false;
  visibility = false;
  dataSource=[];
  columnsToDisplay:string[] = ["subject","catalog_nbr","checked"];
  selectedPairs = [];
  
  form: FormGroup;
  constructor(private fb: FormBuilder, private service: AppService, private router: Router) {
    this.form = this.fb.group({
      coursename: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.service.getSubjectandCourseCodePairs().subscribe((data)=>{
      this.dataSource = data;
      console.log(data);
    })
  }

  create(){
    let vis:string;
    const val = this.form.value;
    if(this.visibility == true){
      vis = "public";
    }
    else{
      vis = "private";
    }
    if(val.coursename){
      let respObject = {"name":val.coursename,"decription":val.description,"schedules":this.selectedPairs,"visibility":vis}
      console.log(respObject);
      this.service.createCourses(respObject).subscribe((data)=>{
        console.log(data);
      })
    }
  }

  updateCheckedList(event,index)
  {
    if(event.checked){
        this.selectedPairs.push({"subject":this.dataSource[index].subject,"course":this.dataSource[index].catalog_nbr})
      }

    }

}
