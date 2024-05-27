import { Injectable } from '@angular/core';
import { CityMasterServiceProxy, CountryMasterServiceProxy, MasterServiceService, StateMasterServiceProxy, SubscriptionPlanMasterServiceProxy, UserMasterServiceProxy } from './master-service.service';

@Injectable({
  providedIn: 'root'
})
export class UnityOfWorkServiceService {

  constructor(
    public countryMasterServiceProxy:CountryMasterServiceProxy,
    public stateMasterServiceProxy:StateMasterServiceProxy,
    public cityMasterServiceProry:CityMasterServiceProxy,
    public masterService:MasterServiceService,
    public userMasterServiceProxy:UserMasterServiceProxy,
    public subscriptionServiceProxy:SubscriptionPlanMasterServiceProxy
  ) { }
}
