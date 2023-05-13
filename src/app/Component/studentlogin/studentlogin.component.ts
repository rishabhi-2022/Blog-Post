import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {
  studentForm!: FormGroup

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
    this.studentForm=this.formBuilder.group({
      name:[''],
      password:['']

    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/users").subscribe(res => {
      const user = res.find((a: any) => {
        return a.name === this.studentForm.value.name && a.password === this.studentForm.value.password;
        console.log(user)
      })
      if (user) {
        alert('login success')
        this.studentForm.reset()
        this.route.navigate(['student-dashboard'])
      }else{
        alert('user not found')
        this.studentForm.reset()
      }
    }, err => {
      alert('something went wrong')
    })

  }

}
