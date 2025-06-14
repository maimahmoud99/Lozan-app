import { Component, OnInit } from '@angular/core';
import { OrderDto } from 'src/app/Core/Models/Order';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { OrderService } from 'src/app/Core/Services/order.service';

@Component({
  selector: 'app-waiting-payment-order',
  templateUrl: './waiting-payment-order.component.html',
  styleUrls: ['./waiting-payment-order.component.scss']
})
export class WaitingPaymentOrderComponent implements OnInit {
ListOrders:OrderDto[]=[]
openModal=false
Url=""
openproductModal=false
ListProduct:any[]=[]

  constructor(private orderservice:OrderService,private AuthService:AuthService){}
  ngOnInit(): void {
    this.orderservice.GetAllOrders().subscribe(res=>{
      this.ListOrders =res
    })  }


    CompletePayment(id:number){
      let order = this.ListOrders.find(a=> a.id== id)
      if(order && order.paymentLink){
        this.Url =order.paymentLink
        this.openModal = true
      }
    }
    
    
    ShowItems(id:number){
      let order=  this.ListOrders.find(a=> a.id ==id)
      if(order){
      this.ListProduct= order?.orderItems!
      this.openproductModal =true
      setTimeout(() => {this.openproductModal = false}); 
 
      }
     }
}
