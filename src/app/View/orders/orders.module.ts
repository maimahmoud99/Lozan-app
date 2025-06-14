import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { WaitingPaymentOrderComponent } from './waiting-payment-order/waiting-payment-order.component';
import { OrdersComponent } from './orders/orders.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { BaseOrderComponent } from './base-order/base-order.component';
import { SidebarOrderComponent } from './sidebar-order/sidebar-order.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgToastModule } from 'ng-angular-popup';
import { ShoppingCardModule } from '../shopping-card/shopping-card.module';
import { OrderItemComponent } from './order-item/order-item.component';


@NgModule({
  declarations: [
    WaitingPaymentOrderComponent,
    OrdersComponent,
    FavoriteComponent,
    BaseOrderComponent,
    SidebarOrderComponent,
    OrderItemComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    AppRoutingModule,
    NgToastModule,
    ShoppingCardModule
    
  ]
})
export class OrdersModule { }
