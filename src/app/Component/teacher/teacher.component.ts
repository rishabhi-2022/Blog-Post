import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/Service/api.service';
import { StudentModel } from './student-model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  formValue!: FormGroup
  studentModelObj = new StudentModel()
  studentData!: any
  showAdd!: boolean
  showUpdate!: boolean

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      roll: [''],
      name: [''],
      dob: [''],
      score: ['']
    })
    this.displayStudent()
  }

  clickAdd() {
    this.formValue.reset()
    this.showAdd = true;
    this.showUpdate = false;
  }
  insertStudent() {
    this.studentModelObj.roll = this.formValue.value.roll;
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.dob = this.formValue.value.dob;
    this.studentModelObj.score = this.formValue.value.score;
    if (this.studentModelObj.roll == 0 || this.studentModelObj.name.length == 0 || this.studentModelObj.dob.length == 0 || this.studentModelObj.score == 0
    ) {
      alert("Please fill the entire form");
    }

    else {
      this.api.postStudent(this.studentModelObj).subscribe(res => {
        console.log(res)
        alert("student added successfully")
        this.formValue.reset()
        const ref = document.getElementById('cancel')
        ref?.click()
        this.displayStudent()
      }, err => {
        alert("something went wrong")
      })
    }

  }
  displayStudent() {
    this.api.getStudent().subscribe(res => {
      this.studentData = res;
    })
  }
  deleteStudent(row: any) {
    this.api.deleteStudent(row.id).subscribe(res => {
      alert("student deleted successfully")
      this.displayStudent()
    }, err => {
      alert("something went wrong")
    })

  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = row.id
    this.formValue.controls['roll'].setValue(row.roll)
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['dob'].setValue(row.dob)
    this.formValue.controls['score'].setValue(row.score)

  }
  updateStudent() {
    this.studentModelObj.roll = this.formValue.value.roll;
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.dob = this.formValue.value.dob;
    this.studentModelObj.score = this.formValue.value.score;
    this.api.updateStudent(this.studentModelObj, this.studentModelObj.id).subscribe(res => {
      alert("update successful")
      this.formValue.reset()
      const ref = document.getElementById('cancel')
      ref?.click()
      this.displayStudent()
    }, err => {
      alert("something went wrong")
    })

  }


}
