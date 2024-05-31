import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './Layout/admin-header/admin-header.component';
import { AdminFooterComponent } from './Layout/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './Layout/admin-sidebar/admin-sidebar.component';
import { AdminRightHeaderComponent } from './Layout/admin-right-header/admin-right-header.component';
import { UserListComponent } from './Componants/Users/user-list/user-list.component';
import { CreateUserComponent } from './Componants/Users/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './Componants/ProfileCore/profile/profile.component';
import { AdminLeftHeaderComponent } from './Layout/admin-left-header/admin-left-header.component';
import { LogoutComponent } from './Shared/ReuseblesComponants/logout/logout.component';
import { SubscriptionsComponent } from './Componants/SubscriptionManager/subscriptions/subscriptions.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    AdminRightHeaderComponent,
    UserListComponent,
    CreateUserComponent,
    ProfileComponent,
    AdminLeftHeaderComponent,
    LogoutComponent,
    SubscriptionsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
