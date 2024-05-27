import { Component, OnInit } from '@angular/core';
import { MasterServiceService } from 'src/app/Shared/Service/master-service.service';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit{

  loggerEmaildId:string | undefined | null;
  sendLoggerEmail:string | undefined;
  constructor(
    private _masterService:MasterServiceService,
  ){}
  ngOnInit(): void {
    
  }

  getLogger(){
    if(this._masterService.getLoggedIn()){
      this.loggerEmaildId = this._masterService.getEmailId();
      if(this.loggerEmaildId!==undefined && this.loggerEmaildId!==null){
        this.sendLoggerEmail = this.loggerEmaildId;
      }
    }
  }
  
}
