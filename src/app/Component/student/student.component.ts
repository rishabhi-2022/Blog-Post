import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Service/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private api: ApiService) { }
  roll!: number;
  name!: string;
  student!: any[];
  filteredStudentData!: any[];
  errorText!: boolean

  ngOnInit(): void {
    this.filteredStudentData = []
    this.student = []
    this.getAllData()
  }
  getAllData() {
    this.api.getStudent().subscribe(res => {
      this.filteredStudentData.push(...res)
    })
  }
  searchStudent() {
    console.log(this.filteredStudentData)
    if (this.filteredStudentData.find(data => (data.roll === this.roll && data.name === this.name))) {
      this.student.push(this.filteredStudentData.find(data => (data.roll === this.roll && data.name === this.name)))
      this.errorText=false
      console.log(this.student)
    }else{
      this.errorText=true
    }
  }

}
