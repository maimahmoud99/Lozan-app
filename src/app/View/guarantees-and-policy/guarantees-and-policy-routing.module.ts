import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuaranteesAndPolicyComponent } from './guarantees-and-policy/guarantees-and-policy.component';

const routes: Routes = [
  {path:'',component:GuaranteesAndPolicyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuaranteesAndPolicyRoutingModule { }
