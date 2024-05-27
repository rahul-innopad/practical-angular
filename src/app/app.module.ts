import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersComponent } from './Layouts/headers/headers.component';
import { FootersComponent } from './Layouts/footers/footers.component';
import { SidebarComponent } from './Layouts/sidebar/sidebar.component';
import { LoginComponent } from './Pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistraionComponent } from './Pages/registraion/registraion.component';
import { CountrylstComponent } from './Componants/Location/Country/countrylst/countrylst.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { StatelstComponent } from './Componants/Location/States/statelst/statelst.component';
import { CityLstComponent } from './Componants/Location/City/city-lst/city-lst.component';
import { PipePipe } from './Shared/Piping/pipe.pipe';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { UserlstComponent } from './Componants/UserMannger/userlst/userlst.component';
import { CreateUserComponent } from './Componants/UserMannger/create-user/create-user.component';
import { SubscriptionPlanComponent } from './Pages/subscription-plan/subscription-plan.component';
import { HeaderRightSideComponent } from './Layouts/header-right-side/header-right-side.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    FootersComponent,
    SidebarComponent,
    LoginComponent,
    RegistraionComponent,
    CountrylstComponent,
    DashBoardComponent,
    StatelstComponent,
    CityLstComponent,
    PipePipe,
    UserlstComponent,
    CreateUserComponent,
    SubscriptionPlanComponent,
    HeaderRightSideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [ BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
