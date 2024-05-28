import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './transaction.component';
import { CheckoutComponent } from './Componants/checkout/checkout.component';

const routes: Routes = [
  { 
    path: '', component: TransactionComponent,
    children:[
      { path: 'checkout/:verificationToken', component: CheckoutComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
