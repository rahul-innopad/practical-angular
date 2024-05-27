import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISubscriptionListDto } from 'src/app/Componants/SubscriptionManager/Interface/isubscription-list-dto';
import { DataTransferServiceService } from 'src/app/Shared/Service/data-transfer-service.service';
import { SubscriptionPlanMasterServiceProxy } from 'src/app/Shared/Service/master-service.service';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.css']
})
export class SubscriptionPlanComponent implements OnInit {


  subscriptionPlanLst: any[] = [];
  constructor(
    private _subscriptionMasterServiceProxy: SubscriptionPlanMasterServiceProxy,
    private dataTransferService:DataTransferServiceService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.getSubscription()
  }

  getSubscription() {
    this._subscriptionMasterServiceProxy.getSubscriptionListByPlanTypeService().subscribe({
      next: (res) => {
        this.subscriptionPlanLst = res;
      }
    })
  }

  getSubscriptionIdValue(id: number) {
    if (id !== 0 && id !== undefined) {
      this._router.navigate([]);
    }
  }
}
