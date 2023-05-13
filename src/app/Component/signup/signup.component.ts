import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      name:[''],
      password:['']

    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/users",this.signupForm.value).subscribe(res=>{
      alert("user added successfully")
      this.signupForm.reset()
      this.route.navigate(['user-login'])
    },err=>{
      alert("something went wrong")
    })

  }

}
