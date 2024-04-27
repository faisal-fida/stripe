import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';

const routes: Routes = [{ path: 'stripe', component: StripePaymentComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
