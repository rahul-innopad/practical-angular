import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { CheckoutComponent } from './Componants/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [
    TransactionComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot("pk_test_51MySyeEoRbJtPRX1X5ZsZJ2dk7iSXH0vQn360tonMZ0YvECZwX8wBJMvfIjKNB51EoDTL9p8vUI4qt8sid5xk4ra00W6gM7eVZ"),

  ]
})
export class TransactionModule { }
