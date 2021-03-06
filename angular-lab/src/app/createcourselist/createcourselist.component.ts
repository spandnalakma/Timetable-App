import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router,ActivatedRoute } from '@angular/router';
import {AuthService} from '../auth/auth.service';

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
  columnsToDisplay:string[] = ["subject","catalog_nbr","year","checked"];
  selectedPairs = [];
  numOfCourses = 0;
  id:string;
  isAddMode:boolean;

  
  form: FormGroup;
  constructor(private fb: FormBuilder, private service: AppService, private router: Router, private authService: AuthService, private route:ActivatedRoute) {
    this.form = this.fb.group({
      coursename: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    

    this.service.getSubjectandCourseCodePairs().subscribe((data)=>{
      this.dataSource = data;
    })

    if(!this.isAddMode){
      this.service.getUserCourseListyId(this.id).subscribe((data)=>{
        this.form.patchValue({coursename:data[0].name, description:data[0].description})
      })
    }
  }

  get CourseName(){
    return this.form.get('coursename')
    }

  onSubmit(){
    let vis:string;
    const val = this.form.value;
    if(this.visibility == true){
      vis = "public";
    }
    else{
      vis = "private";
    }
    if(val.coursename){
      let respObject = {"name":val.coursename,"description":val.description,"schedules":this.selectedPairs,"visibility":vis,"numberofcourses":this.numOfCourses, "userName":this.authService.getUserName()};
    
    if (this.isAddMode) {
      this.create(respObject);
  } else {
      this.update(respObject);
  }
    }
  }
  create(respObject){
      let count = 0;
      this.service.getUserCreateCount(this.authService.getUserName()).subscribe((data)=>{
        count = parseInt(data);
      })
      if(count<=20){
      this.service.createCourses(respObject).subscribe((data)=>{
        if(data.message){
        console.log(data);
        alert(data.message);}
      })
    }
    }

  update(respObject){
      this.service.updateUserCoursList(this.id,respObject).subscribe((data)=>{
        if(data.message){
        console.log(data);
        alert(data.message);
      }
      })
  }

  updateCheckedList(event,index)
  {
    if(event.checked){
        this.numOfCourses += 1;
        if(this.dataSource[index].year){
        this.selectedPairs.push({"subject":this.dataSource[index].subject,"course":this.dataSource[index].catalog_nbr,"year":this.dataSource[index].year})
      }else{
        this.selectedPairs.push({"subject":this.dataSource[index].subject,"course":this.dataSource[index].catalog_nbr})
      }
      }

    }

    viewlist(){
      this.router.navigateByUrl('/usercourselist');
    }

}
