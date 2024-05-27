import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { CreateSubscriberAccountComponent } from './CreateSubscriberComponants/create-subscriber-account/create-subscriber-account.component';

const routes: Routes = [
  { 
    path: '', component: AccountComponent,
    children: [
      { path:'',redirectTo:'create-account',pathMatch:'full'},
      { path: 'create-account/:subscriptionId',component:CreateSubscriberAccountComponent}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
