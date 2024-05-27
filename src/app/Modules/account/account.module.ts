import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { CreateSubscriberAccountComponent } from './CreateSubscriberComponants/create-subscriber-account/create-subscriber-account.component';
import { CreatePasswordComponent } from './CreateSubscriberComponants/create-password/create-password.component';
import { PurchaseSubscriptionComponent } from './CreateSubscriberComponants/purchase-subscription/purchase-subscription.component';
import { AccountCreationComponent } from './CreateSubscriberComponants/account-creation/account-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountComponent,
    CreateSubscriberAccountComponent,
    CreatePasswordComponent,
    PurchaseSubscriptionComponent,
    AccountCreationComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
