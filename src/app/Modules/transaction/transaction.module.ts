import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { CheckoutComponent } from './Componants/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransactionComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TransactionModule { }
