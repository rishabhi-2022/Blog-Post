import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
    this.userForm=this.formBuilder.group({
      name:[''],
      password:['']

    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/users").subscribe(res => {
      const user = res.find((a: any) => {
        return a.name === this.userForm.value.name && a.password === this.userForm.value.password;
        console.log(user)
      })
      if (user) {
        alert('login success')
        this.userForm.reset()
        this.route.navigate(['teacher-dashboard'])
      }else{
        alert('user not found')
        this.userForm.reset()
      }
    }, err => {
      alert('something went wrong')
    })

  }

}
