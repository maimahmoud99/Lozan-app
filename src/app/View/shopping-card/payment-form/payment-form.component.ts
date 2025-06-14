import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent  implements OnInit ,OnChanges {

  @Input() openModalTrigger: boolean = false;
  @Input() Url: string = "";

  @ViewChild('basicModal') basicModal: any;

constructor( private modalService:NgbModal, private Authservice:AuthService,public sanitizer: DomSanitizer, private route:Router){
    ///this.otp = Array(this.otpLength).fill('');

  }
  ngOnInit(): void {

   }
   ngOnChanges() {
     debugger
     if (this.openModalTrigger && this.Url !="") {
      //this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.Show()
        
     }
   }
 

  
  Show(){

    this.modalService.open(this.basicModal, {size: 'lg'  , backdrop: 'static', // prevents closing on click outside
      keyboard: false }).result.then((result) => {
     debugger
      console.log("Modal closed" + result);
      this.openModalTrigger=false

    }).catch((res) => {});

 }

 Close(){
  this.modalService.dismissAll()
  this.route.navigateByUrl("/")
 }
}
