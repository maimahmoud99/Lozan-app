import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';


import { TemplateModule } from 'src/app/template/template.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { MinutesSecondsPipe } from 'src/app/Core/Pipes/minutes-seconds.pipe';


@NgModule({
  declarations: [
    LoginComponent,
    MinutesSecondsPipe

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgbModule,
    FormsModule,
    NgOtpInputModule,
    ReactiveFormsModule
   // TemplateModule
  ],exports:[
    LoginComponent
  ]
})
export class AuthModule { }
