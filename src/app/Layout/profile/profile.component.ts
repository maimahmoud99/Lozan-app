import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private Authsevice:AuthService,private fb:FormBuilder,private toast: NgToastService){}
  userForm!:FormGroup
  date: Date = new Date();

  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullName: [''],
    email:['', [Validators.required,Validators.email]],
    birthDate: [''],
    phoneNumber: [''],
    })
  
     this.Authsevice.GetCurrentUserInfo().subscribe(res=>{
      this.userForm.patchValue({
        fullName: res.fullName,
        email:res.email,
        birthDate: res.birthDate,
        phoneNumber: res.phoneNumber,
      })
     })
  }
  get fullName(){
    return this.userForm.get("fullName")
  }
  get email(){
    return this.userForm.get("fullName")
  }
  SaveData(){
    this.Authsevice.EditCurrentUserInfo(this.userForm.value).subscribe(res=>{
      this.toast.success({detail:"تم تعديل بيانات الملف الشخصي  بنجاح",summary:'سلة',duration:5000,  position: 'topLeft'})

    })
  }

}
