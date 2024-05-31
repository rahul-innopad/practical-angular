import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './Componants/Users/user-list/user-list.component';
import { ProfileComponent } from './Componants/ProfileCore/profile/profile.component';
import { authGuard } from 'src/app/Shared/Guards/auth.guard';
import { SubscriptionsComponent } from './Componants/SubscriptionManager/subscriptions/subscriptions.component';

const routes: Routes = [
  { 
    path: '', component: AdminComponent,
    children: [
      {
        path:'users-lst',component:UserListComponent,canActivate:[authGuard]
      },
      {
        path:'profile',component:ProfileComponent,canActivate:[authGuard]
      },
      {
        path:'subscription',component:SubscriptionsComponent,canActivate:[authGuard]
      }
    ]
  
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
