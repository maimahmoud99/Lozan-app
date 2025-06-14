import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseOrderComponent } from './base-order/base-order.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { WaitingPaymentOrderComponent } from './waiting-payment-order/waiting-payment-order.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from 'src/app/Layout/profile/profile.component';

const routes: Routes = [
  {path:"", component:BaseOrderComponent,
    children:[
      
  {path:"Favorites", component:FavoriteComponent},
  {path:"WaitingOrder", component:WaitingPaymentOrderComponent},
  {path:"MyOrders", component:OrdersComponent},
  {
    path: 'profile',
   component : ProfileComponent
  },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
