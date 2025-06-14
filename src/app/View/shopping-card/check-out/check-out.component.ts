import { AuthService } from 'src/app/Core/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { PaymentType } from 'src/app/Core/Models/Enums';
import { CityDto, CountryDto, LookUpDto } from 'src/app/Core/Models/LookUp';
import { BasketProduct } from 'src/app/Core/Models/product';
import { BasketService } from 'src/app/Core/Services/basket.service';
import { LookUpService } from 'src/app/Core/Services/look-up.service';
import { OrderService } from 'src/app/Core/Services/order.service';
import { SharedService } from 'src/app/Core/Services/shared.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  ShowAddress=true
  ListProduct: BasketProduct[] = [];
  encryptedText:string=""
  orderForm!: FormGroup;
 ListCountries:CountryDto[]=[]
 ListCites:CityDto[]=[]
 ListAddress:any[]=[]
 openLoginModal=false
 Url=""
 PaymentType =PaymentType
 TotalPrice=0
 CostShipping=0
 IsSpinner=false
 userInfo:any
  selectedAddress:any
  selectedCity:any

 changePaymentMethod:boolean=false;
 separateDialCode = true;
 SearchCountryField = SearchCountryField;
 CountryISO = CountryISO;
 PhoneNumberFormat = PhoneNumberFormat;
 preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  constructor(private fb:FormBuilder, private route:ActivatedRoute, private sheradservice:SharedService,private toast: NgToastService,
    private LookUpservice:LookUpService, private orderservice:OrderService,private basktService:BasketService,
    private AuthService:AuthService,private router: Router
  ){}
  ngOnInit(): void {
    this.AuthService.UserInfo$.subscribe(res=>{
      this.userInfo=res
    })
   //this.tetst()

    this.orderForm = this.fb.group({
      totalAmount:['',Validators.required],
      paymentTypeId:['',Validators.required],
      products: this.fb.array([this.createProductGroup()]),
      addresses:this.createAddressGroup(), // ADDRESSES HERE
      shippingCompany: ['Ayamkan'],
       token:[]
    });
 
    this.route.paramMap.subscribe(params => {
      this.encryptedText = params.get('encryptedData')!;
      if (this.encryptedText) {
       let  data = this.sheradservice.decryptData(this.encryptedText);
        console.log('Decrypted Checkout Data:', this.ListProduct);
        this.ListProduct= data.List
        this.ListProduct.forEach((item,indx)=>{
          if(indx > 0)
          this.addProduct()

          this.products.at(indx).setValue({
            productId: item.ProductId,
            productName: item.name,
            ProductDescription:item.name,
            quantity: item.quantity,
            price: item.price,
            selectionSide: item.selections
          })
          this.TotalPrice = data.TotalPrice
         })
        this.TotalAmount?.setValue(this.TotalPrice)
      }
    });


 
    this.LookUpservice.getCountries().subscribe(res=>{
      this.ListCountries=res
       this.ListCountries.map(a=> this.ListCites =a.cites);
       this.ChangeCountry(1)
    })
  }

  
  
  get f() {
    return  this.orderForm.get('payment.method') ;
    
  }
  get TotalAmount() {
    return  this.orderForm.get('totalAmount') ;
    
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      id: [''], // Use UUID or generated ID
      customerName: ['',Validators.required],
    //  cityId: [0, Validators.required],
      neighborhood: ['',Validators.required],
      userPhoneNumber:['',[Validators.required,Validators.pattern(/^((?:[+?0?0?966]+)(?:\s?\d{2})(?:\s?\d{7}))$/)
      ]],
    });
  }
  
  get addresses() {
    return this.orderForm.get('addresses') as FormGroup;
  }
  

  createProductGroup(): FormGroup {
    return this.fb.group({
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      ProductDescription: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0.00, Validators.required],
      selectionSide:['']
    });
  }

  get products() {
    return this.orderForm.get('products') as FormArray;
  }

  addProduct() {
    this.products.push(this.createProductGroup());
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  onPaymentMethodChange() {
    const method = this.orderForm.get('payment.method')?.value;
    const details = this.orderForm.get('payment.details') as FormGroup;

    if (method === 'Credit Card') {
      details.get('cardNumber')?.setValidators([Validators.required]);
      details.get('expiryDate')?.setValidators([Validators.required]);
      details.get('cvv')?.setValidators([Validators.required]);
      details.get('cardHolderName')?.setValidators([Validators.required]);
    } else {
      details.reset();
      Object.keys(details.controls).forEach(key => {
        details.get(key)?.clearValidators();
        details.get(key)?.updateValueAndValidity();
      });
    }
  }


  SaveAddress(){
    this.addresses.value.forEach((element:any) => {
      this.ListAddress.push({street:element.street,neighborhood: element.neighborhood})

    });
  }

  CopyLink(){
    const fullLink = `${window.location.origin}/Card/CheckOut/${this.encryptedText}`;

    navigator.clipboard.writeText(fullLink).then(() => {
     // alert('Checkout link copied to clipboard!');
      this.toast.success({detail:"Checkout link copied to clipboard!",summary:'Copy Link',duration:5000});


    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  
  }

  
  submitOrder(){
    const rawCardNumber = this.orderForm.get('payment.details.cardNumber')?.value.replace(/\s/g, '');
   console.log(rawCardNumber)
  }
showCustomError: boolean = false;
customErrorMessage: string = 'هناك حقول يجب إدخالها';
errorShakeClass: string = '';

  SavePay(){
  
     if(this.orderForm.invalid){
      // this.toast.error({detail:"تاكد من ادخال كل البيانات",summary:'اتمام الطلب',duration:3000,position:"topLeft"});
      this.orderForm.markAllAsTouched();
// إظهار الرسالة
  this.customErrorMessage = 'هناك حقول يجب إدخالها';
  this.showCustomError = true;

  // تشغيل حركة الهزة
  this.errorShakeClass = 'animate-shake';

  // إزالة الهزة بعد ثانية (عشان تتكرر لو ضغط المستخدم تاني)
  setTimeout(() => {
    this.errorShakeClass = '';
  }, 1000);
      return;
     }
    this.IsSpinner=true
    
    this.orderservice.CheckOutOrder(this.orderForm.value).subscribe(res=>{
      
      if(res.redirect_url && this.orderForm.get("paymentTypeId")?.value != PaymentType.Prepaid){
      this.Url=res.redirect_url
      this.openLoginModal=true
      }else{
        this.toast.success({detail:"تم تاكيد الطلب بنجاح",summary:'اتمام الطلب',duration:3000,position:"topLeft"});

      }
      this.IsSpinner=false
      this.basktService.saveCartToStorage([])

    })
  }

  ChangeCountry(countryId:any){
    this.ListCites = this.ListCountries.find(a=> a.id == countryId)!.cites
  }
  

  showLog(msg: string, error?: any): void {
    if (error) {
      console.error(msg, error);
    } else {
      console.log(msg);
    }
    const logElement = document.getElementById('pnl_log');
    if (logElement) {
      logElement.innerText += `\n${msg}`;
    }
  }

  
  onApplePayButtonClicked(): void {
    if (!(window as any).ApplePaySession) {
      this.showLog('ApplePay Session not found');
      return;
    }

    const request: ApplePayJS.ApplePayPaymentRequest = {
      countryCode: "SA",
      currencyCode: "SAR",
      merchantCapabilities: ['supports3DS'],
      supportedNetworks: ['visa', 'mada', 'masterCard', 'amex'],
      total: {
        label: 'Click Pay Angular Demo',
        type: 'final',
        amount: "1"
      }
    };

    const session = new (window as any).ApplePaySession(14, request);

    session.onvalidatemerchant = async (event: any) => {
      this.showLog('on validate merchant begin');
      try {
       // alert("URL: "+ event.validationURL)
        console.log("URL: "+ event.validationURL)
        const response = await fetch(`${environment.apiUrl}/Order/validate?vurl=${event.validationURL}`);
        const merchantSession = await response.json();
        console.log(merchantSession)
        session.completeMerchantValidation(merchantSession);
        this.showLog('on validate merchant complete');
      } catch (error) {
        this.showLog('Error fetching merchant session', error);
      }
    };

    session.onpaymentmethodselected = () => {
      this.showLog('on payment method selected');
      session.completePaymentMethodSelection({
        newTotal: {
          label: 'Click Pay Angular Demo',
          type: 'final',
          amount: 1
        }
      });
    };

    session.onshippingmethodselected = () => {
      this.showLog('on shipping method selected');
      session.completeShippingMethodSelection({});
    };

    session.onshippingcontactselected = () => {
      this.showLog('on shipping contact selected');
      session.completeShippingContactSelection({});
    };

    session.onpaymentauthorized = async (event: any) => {
      this.showLog('on payment authorized begin');
      console.log('on payment authorized begin');
      try {
        this.orderForm.get("token")?.setValue(event.payment.token)
     //   alert("token: "+ JSON.stringify(event.payment.token))
        console.log("token"+ event.payment.token )
        const response = await fetch(`${environment.apiUrl}/Order/payment`, {
          method: 'POST',
          body: JSON.stringify(this.orderForm.value),
        });
        const res = await response.json();
        console.log(res)
        this.showLog(res.result.message);

        session.completePayment({
          status: res.success ? (window as any).ApplePaySession.STATUS_SUCCESS : (window as any).ApplePaySession.STATUS_FAILURE
        });
        this.showLog('on payment authorized complete');
      } catch (error) {
        this.showLog('Error authorizing the payment', error);
      }
    };

    session.oncancel = () => {
      this.showLog('on cancel complete');
    };

    session.begin();
    this.showLog('begin');
  }
 async tetst(){
  
  const response = await fetch(`${environment.apiUrl}/Order/validate?vurl=${"https://google.com"}`);
  const merchantSession = await response.json();
  console.log(merchantSession)
 }
}



// src/apple-pay.d.ts or src/types/apple-pay.d.ts

declare namespace ApplePayJS {
  interface ApplePayPaymentRequest {
    countryCode: string;
    currencyCode: string;
    supportedNetworks: string[];
    merchantCapabilities: string[];
    total: ApplePayLineItem;
  }

  interface ApplePayLineItem {
    label: string;
    amount: string;
    type?: 'pending' | 'final';
  }

  interface ApplePayPayment {
    token: any;
  }

  interface ApplePayPaymentAuthorizedEvent {
    payment: ApplePayPayment;
  }

  interface ApplePaySession {
    new (version: number, request: ApplePayPaymentRequest): ApplePaySession;

    begin(): void;

    onvalidatemerchant: (event: { validationURL: string }) => void;
    onpaymentmethodselected: (event: any) => void;
    onshippingmethodselected: (event: any) => void;
    onshippingcontactselected: (event: any) => void;
    onpaymentauthorized: (event: ApplePayPaymentAuthorizedEvent) => void;
    oncancel: (event: any) => void;

    completeMerchantValidation(merchantSession: any): void;
    completePaymentMethodSelection(update: any): void;
    completeShippingMethodSelection(update: any): void;
    completeShippingContactSelection(update: any): void;
    completePayment(result: { status: number }): void;
  }

  const ApplePaySession: {
    new (version: number, request: ApplePayPaymentRequest): ApplePaySession;
    canMakePayments(): boolean;
    supportsVersion(version: number): boolean;
    STATUS_SUCCESS: number;
    STATUS_FAILURE: number;
  };
  
}