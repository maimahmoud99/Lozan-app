import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './View/index/index.component';
import { AboutUsComponent } from './View/about-us/about-us.component';
import { CommonQuestionComponent } from './View/common-question/common-question.component';
import { SuggationCentersComponent } from './View/suggation-centers/suggation-centers.component';
import { ActivationGuaranteeComponent } from './View/activation-guarantee/activation-guarantee.component';
import { ProfileComponent } from './Layout/profile/profile.component';

const routes: Routes = [
  {
    path: '',
   component : IndexComponent
  },
  {
    path: 'AboutUs',
   component : AboutUsComponent
  },
  {
    path: 'CommonQuestion',
   component : CommonQuestionComponent
  },
  {
    path: 'Centers',
   component : SuggationCentersComponent
  },
 
  {

    path: 'Card',
    loadChildren: () => import('./View/shopping-card/shopping-card.module').then(m => m.ShoppingCardModule)
  },
  {

    path: 'auth',
    loadChildren: () => import('./Layout/auth/auth.module').then(m => m.AuthModule)
  },
  {

    path: 'template',
    loadChildren: () => import('./template/template.module').then(m => m.TemplateModule)
  },
  {

    path: 'InstallationInstructions',
    loadChildren: () => import('./View/installation/installation.module').then(m => m.InstallationModule)
  },
  {

    path: 'GuaranteesAndPolicy',
    loadChildren: () => import('./View/guarantees-and-policy/guarantees-and-policy.module').then(m => m.GuaranteesAndPolicyModule)
  },
  {

    path: 'orders',
    loadChildren: () => import('./View/orders/orders-routing.module').then(m => m.OrdersRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
