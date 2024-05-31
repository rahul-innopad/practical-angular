import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterServiceService, SubscriptionPlanMasterServiceProxy } from 'src/app/Shared/Service/master-service.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit{


  constructor(
    private _companySubscriptionMasterServiceProxy:SubscriptionPlanMasterServiceProxy,
    private _masterServiceProxy:MasterServiceService,
    private _router:Router
  ){}
  ngOnInit(): void {
    this.getSubscriptionDetails();
  }

  getSubscriptionDetails(){
    if(this._masterServiceProxy.getLoggedIn()){
      let loggerId=this._masterServiceProxy.getEmailId();
      let companyId=this._masterServiceProxy.getCompanyId();
      if(loggerId && companyId){
        this._companySubscriptionMasterServiceProxy.getCompanySubscriptionListService(loggerId,companyId).subscribe({
          next:(data)=>{ 
            console.log(data);
          }
        })
      }
    }
  }

  SubscriptionUpgrade(){
    if(window.confirm("Do you want to upgrade your plan")){
      this._router.navigate(['/company-subscription'])
    }
  }
}
