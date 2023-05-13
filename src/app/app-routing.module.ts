import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { SignupComponent } from './Component/signup/signup.component';
import { StudentComponent } from './Component/student/student.component';
import { StudentloginComponent } from './Component/studentlogin/studentlogin.component';
import { TeacherComponent } from './Component/teacher/teacher.component';
import { UserComponent } from './Component/user/user.component';

const routes: Routes = [
{path:'', redirectTo:'login', pathMatch:'full'},
{path:'login', component:LoginComponent},
{path:'student-dashboard', component:StudentComponent},
{path:'teacher-dashboard', component:TeacherComponent},
{path:'user-login', component:UserComponent},
{path:'signup', component:SignupComponent},
{path:'student-login',component:StudentloginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
