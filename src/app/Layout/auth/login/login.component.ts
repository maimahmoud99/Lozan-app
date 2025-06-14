import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOtpInputComponent } from 'ng-otp-input';
import { SendOtpRequest } from 'src/app/Core/Models/Auth';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit ,OnChanges {

  @Input() openModalTrigger: boolean = false;

  @ViewChild('basicModal') basicModal: any;


  @ViewChild(NgOtpInputComponent, { static: false }) otpInput: NgOtpInputComponent | undefined;

  @ViewChildren('buildingNoInput') buildingNoInputs!: QueryList<ElementRef<HTMLInputElement>>;
  inputsArray: ElementRef<HTMLInputElement>[] = [];

  IsWaitVerify=true
  IsAlreadyExist=false
  IsVerifyOtp=false
  email:string=""
  interval: any;
 IsSpinner=false
  otpRequest:SendOtpRequest = {email:""}
  MessageError=""
  password:string=""
  fullName:string=""
  regPassword:string=""
  cregPassword:string=""
  countdown: number = 300; // 5 minutes in seconds
  canResend= false
  otpGroup!:FormGroup
  constructor( private modalService:NgbModal, private Authservice:AuthService, private fb:FormBuilder){
    ///this.otp = Array(this.otpLength).fill('');

  }
  ngOnInit(): void {
   this.otpGroup = this.fb.group({
     otp:[]
   })
      console.log("4444")
  }
  ngOnChanges() {
    debugger
    if (this.openModalTrigger) {
      this.inputsArray = this.buildingNoInputs.toArray();
        console.log( this.inputsArray)
          this.Show()
    }
  }



  Show(){

     this.modalService.open(this.basicModal, {size: 'md'}).result.then((result) => {
      debugger
       console.log("Modal closed" + result);
       this.openModalTrigger=false
       this.inputsArray = this.buildingNoInputs.toArray();

     }).catch((res) => {});

  }
  
  Close(){
    this.modalService.dismissAll()
  }
  onOtpChange(event:any){
    debugger
    
    if(event.length ==5){
      this.IsSpinner =true
      this.Authservice.verifyOtp({email:this.email,otp:event}).subscribe(res=>{
        if(res){
          this.IsVerifyOtp= res
          this.IsSpinner=false
        }else{
          this.MessageError="الكود غير صحيح اعد كتابته بشكل صحيح مرة اخري"
        }
      },()=>{
        this.otpGroup?.get("otp")?.setValue("")
        this.IsSpinner=false
        this.MessageError="الكود غير صحيح اعد كتابته بشكل صحيح مرة اخري"

      })
    }
  }
  VerifyEmail(){
   this.otpRequest.email= this.email
   this.IsSpinner=true
   this.Authservice.VerifyEmail(this.otpRequest!).subscribe(res=>{
    this.IsWaitVerify= res.isAlreadyExist;
    this.IsAlreadyExist= res.isAlreadyExist;
    this.IsSpinner=false
    if(!res.isAlreadyExist)
        this.startCountdown();
   })
  }
  Login(){
  this.Authservice.Login({email:this.email,password:this.password}).subscribe(res=>{
    if(res.accessToken){
    localStorage.setItem("token",res.accessToken)
    localStorage.setItem("UserInfo",JSON.stringify({fullName:res.fullName,email:res.email}))
    this.Authservice.SetLogged(true)
    this.Authservice.SetUserInfo(JSON.parse(localStorage.getItem("UserInfo")!))
    this.Close()
    }

  },()=>{
    this.password=""
    this.IsSpinner=false
    this.MessageError="  خطاء في البريد الالكتروني او كلمة المرور"

  })
  }

  Register(){
    this.IsSpinner=true
    this.Authservice.register({email:this.email,password:this.regPassword,fullName:this.fullName}).subscribe(res=>{
      if(res.accessToken){

        localStorage.setItem("token",res.accessToken)
        localStorage.setItem("UserInfo",JSON.stringify({fullName:res.fullName,email:res.email}))
        this.Authservice.SetLogged(true)
        this.Authservice.SetUserInfo(JSON.parse(localStorage.getItem("UserInfo")!))    
        this.IsSpinner= false
         this.Close()
      }
        else{

      }
    })
  }

  startCountdown() {
    this.canResend = false;
    this.countdown = 30; // reset to 5 minutes

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
       this.canResend = true;
       this.IsSpinner = false
       
              clearInterval(this.interval);
      }
    }, 1000);
  }

}
