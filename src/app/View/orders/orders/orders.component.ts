import { Component, OnInit } from '@angular/core';
import { PaymentType } from 'src/app/Core/Models/Enums';
import { OrderDto } from 'src/app/Core/Models/Order';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { OrderService } from 'src/app/Core/Services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ListOrders:OrderDto[]=[]
   PaymentType =PaymentType
   openModal=false
   ListProduct:any[]=[]

  constructor(private orderservice:OrderService,private AuthService:AuthService){}
  ngOnInit(): void {
    this.orderservice.GetAllOrders().subscribe(res=>{
      this.ListOrders =res
    })  }


    
    ShowItems(id:number){
     let order=  this.ListOrders.find(a=> a.id ==id)
     if(order){
     this.ListProduct= order?.orderItems!
     this.openModal =true
     setTimeout(() => {this.openModal = false}); 

     }
    }
}
