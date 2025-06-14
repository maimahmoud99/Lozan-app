import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-activation-guarantee',
  templateUrl: './activation-guarantee.component.html',
  styleUrls: ['./activation-guarantee.component.scss']
})
export class ActivationGuaranteeComponent implements OnInit {
  constructor(private toast: NgToastService){}
  ngOnInit(): void {
  }

  SaveData(){
    this.toast.success({detail:"تم تفعيل الضمان لمدة 10 سنوات",summary:'تفعيل الضمان',duration:5000 , position:"topLeft"});

  }
}
