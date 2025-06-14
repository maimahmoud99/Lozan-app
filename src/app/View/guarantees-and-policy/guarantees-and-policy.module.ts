import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuaranteesAndPolicyRoutingModule } from './guarantees-and-policy-routing.module';
import { GuaranteesAndPolicyComponent } from './guarantees-and-policy/guarantees-and-policy.component';


@NgModule({
  declarations: [
    GuaranteesAndPolicyComponent
  ],
  imports: [
    CommonModule,
    GuaranteesAndPolicyRoutingModule
  ]
})
export class GuaranteesAndPolicyModule { }
