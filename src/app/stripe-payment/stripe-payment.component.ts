import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgxStripeModule,
  StripeCardComponent,
  StripeFactoryService,
  StripeInstance,
  StripeService,
} from 'ngx-stripe';
import { Subscription, switchMap } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss'],
})
export class StripePaymentComponent implements OnInit, OnDestroy {
  public stripe!: StripeInstance;
  public stripeAmount!: number;
  public stripePublicKey = 'key';

  private subscriptions: Subscription;

  constructor(
    private http: HttpClient,
    private stripeFactory: StripeFactoryService
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    // dynamically load the stripe script
    this.stripe = this.stripeFactory.create(this.stripePublicKey);
    // stripe amount is in cents, you should multiply your amount by 100
    this.stripeAmount = 100;
  }

  checkout() {
    const host = 'http://localhost:3000';
    const checkout: Subscription = this.http
      .post(
        host + '/create-checkout-session',
        { data: { amount: this.stripeAmount * 100 } },
        { observe: 'response' }
      )
      .pipe(
        switchMap((response: HttpResponse<Object>) => {
          const session: IStripeSession = response.body as IStripeSession;
          return this.stripe.redirectToCheckout({ sessionId: session.id });
        })
      )
      .subscribe((result) => {
        // If `redirectToCheckout` fails due to a browser or network
        if (result.error) {
          console.log(result.error);
        }
      });
    this.subscriptions.add(checkout);
  }
}

interface IStripeSession {
  id: string;
}
