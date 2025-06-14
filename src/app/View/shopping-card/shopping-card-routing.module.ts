import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path:'', component:CardComponent},
  {path:'ShopingCard', component:ShoppingCardComponent},
  {path:'productdetails/:id', component:ProductDetailsComponent},

  {path:'CheckOut/:encryptedData', component:CheckOutComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCardRoutingModule { }
