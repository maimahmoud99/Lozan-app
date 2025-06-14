import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './View/index/index.component';
import { TemplateModule } from './template/template.module';
import { AuthModule } from './Layout/auth/auth.module';
import { RouterModule } from '@angular/router';
import { ShoppingCardModule } from "./View/shopping-card/shopping-card.module";
import { AboutUsComponent } from './View/about-us/about-us.component';
import { CommonQuestionComponent } from './View/common-question/common-question.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Core/Interceptors/auth.interceptor';
import { ErrorHandlerInterceptor } from './Core/Interceptors/error-handler.interceptor';
import { MinutesSecondsPipe } from './Core/Pipes/minutes-seconds.pipe';
import { SuggationCentersComponent } from './View/suggation-centers/suggation-centers.component';
import { StarRatingModule } from 'angular-star-rating';
import { SafePipe } from './Core/Pipes/safe.pipe';
import { ProfileComponent } from './Layout/profile/profile.component';
import { OrdersRoutingModule } from './View/orders/orders-routing.module';
import { OrdersModule } from './View/orders/orders.module';
import { ActivationGuaranteeComponent } from './View/activation-guarantee/activation-guarantee.component';
import { NgToastModule } from 'ng-angular-popup';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './View/loader/loader.component';
import { LoaderInterceptor } from './Core/Interceptors/loader.interceptor';
import { LucideAngularModule, SaudiRiyal } from 'lucide-angular';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutUsComponent,
    CommonQuestionComponent,
    SuggationCentersComponent,
    ProfileComponent,
    ActivationGuaranteeComponent,
    LoaderComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
   TemplateModule,
    NgbModule,
    //AuthModule,
        NgToastModule,
    LucideAngularModule.pick({SaudiRiyal}),
    ShoppingCardModule,
    StarRatingModule.forRoot(),
    OrdersModule,
    BrowserAnimationsModule

],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorHandlerInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent,ActivationGuaranteeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class AppModule { }
