import { Component, Input, OnInit } from '@angular/core';
import { UserMasterServiceProxy } from 'src/app/Shared/Service/master-service.service';

@Component({
  selector: 'app-admin-right-header',
  templateUrl: './admin-right-header.component.html',
  styleUrls: ['./admin-right-header.component.css']
})
export class AdminRightHeaderComponent implements OnInit{

  @Input() getLoggerEmail:string | undefined;

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
}
