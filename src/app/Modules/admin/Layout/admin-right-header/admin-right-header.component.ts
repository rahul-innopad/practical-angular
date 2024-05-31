import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserMasterServiceProxy } from 'src/app/Shared/Service/master-service.service';
import { LogoutComponent } from '../../Shared/ReuseblesComponants/logout/logout.component';

@Component({
  selector: 'app-admin-right-header',
  templateUrl: './admin-right-header.component.html',
  styleUrls: ['./admin-right-header.component.css']
})
export class AdminRightHeaderComponent implements OnInit{

  @Input() getLoggerEmail:string | undefined;
  @ViewChild(LogoutComponent) loggedOut!:LogoutComponent;

  constructor(
    private _userMasterServiceProxy:UserMasterServiceProxy
  ){}
  ngOnInit(): void {
  }

  getLoggerInformation(){
    if(this.getLoggerEmail!==undefined && this.getLoggerEmail!==null){
      this._userMasterServiceProxy.getUserListService
    }
  }

  logout(){
    this.loggedOut.loggedOut();
  }
}
