import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

import { NgxStripeModule } from 'ngx-stripe';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, StripePaymentComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(),
    StripePaymentComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
