import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCardRoutingModule } from './shopping-card-routing.module';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { CardComponent } from './card/card.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { AuthModule } from 'src/app/Layout/auth/auth.module';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { NgbCarouselConfig, NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TemplateModule } from 'src/app/template/template.module';
import { StarRatingModule } from 'angular-star-rating';
import { SafePipe } from 'src/app/Core/Pipes/safe.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { LucideAngularModule, SaudiRiyal } from 'lucide-angular';


@NgModule({
  declarations: [
    ShoppingCardComponent,
    CardComponent,
    CheckOutComponent,
    PaymentFormComponent,
    SafePipe,
    ProductDetailsComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ShoppingCardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgToastModule,
    AuthModule,
    TemplateModule,
    StarRatingModule.forChild(),
    NgxIntlTelInputModule,
    NgbCarouselModule,
    LucideAngularModule.pick({SaudiRiyal})

  ],
  exports:[
    CardComponent,PaymentFormComponent
  ],
  bootstrap: [ProductDetailsComponent],
  providers:[ShoppingCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 

})
export class ShoppingCardModule { }