import { Component, OnInit } from '@angular/core';
import { MasterServiceService } from 'src/app/Shared/Service/master-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent {


  constructor(
    private _masterService: MasterServiceService,
  ){}

  loggedOut(){
    if(this._masterService.getLoggedIn()){
      let loggerId=this._masterService.getEmailId();
      if(loggerId){
        if(window.confirm("Do you want to logout!")){
          this._masterService.userLoggedOutService(loggerId).subscribe({
            next:(res)=>{
              alert(res.message);
              this._masterService.removeToken();
            }
          })
        }
      }
    }
  }

}
