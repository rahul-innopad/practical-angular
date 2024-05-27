import { Component, Input, OnInit } from '@angular/core';
import { UserMasterServiceProxy } from 'src/app/Shared/Service/master-service.service';

@Component({
  selector: 'app-header-right-side',
  templateUrl: './header-right-side.component.html',
  styleUrls: ['./header-right-side.component.css']
})
export class HeaderRightSideComponent implements OnInit{

  @Input() getLoggerEmail:string | undefined;

  constructor(
    private _userMasterServiceProxy:UserMasterServiceProxy
  ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getLoggerInformation(){
    if(this.getLoggerEmail!==undefined && this.getLoggerEmail!==null){
      this._userMasterServiceProxy.getUserListService
    }
  }
}
