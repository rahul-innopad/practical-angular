import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { authGuard } from './Shared/Guards/auth.guard';
import { CountrylstComponent } from './Componants/Location/Country/countrylst/countrylst.component';
import { StatelstComponent } from './Componants/Location/States/statelst/statelst.component';
import { CityLstComponent } from './Componants/Location/City/city-lst/city-lst.component';
import { UserlstComponent } from './Componants/UserMannger/userlst/userlst.component';
import { RegistraionComponent } from './Pages/registraion/registraion.component';
import { SubscriptionPlanComponent } from './Pages/subscription-plan/subscription-plan.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashBoardComponent,
    canActivate:[authGuard]
  },
  {
    path:'country',
    component:CountrylstComponent,
    canActivate:[authGuard]
  },
  {
    path:'state',
    component:StatelstComponent,
    canActivate:[authGuard]
  },
  {
    path:'city',
    component:CityLstComponent,
    canActivate:[authGuard]
  },
  {
    path:'users',
    component:UserlstComponent,
    canActivate:[authGuard]
  },
  {
    path:'registration',
    component:RegistraionComponent,
  },
  {
    path:'company-subscription',
    component:SubscriptionPlanComponent
  },
  { path: 'Account', loadChildren: () => import('./Modules/account/account.module').then(m => m.AccountModule) },
  { path: 'Admin', loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'transaction', loadChildren: () => import('./Modules/transaction/transaction.module').then(m => m.TransactionModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
