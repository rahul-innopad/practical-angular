import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ISubscriberDetials, ISubscriberPassword } from '../Interfaces/isubscriber-detials';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-subscriber-account',
  templateUrl: './create-subscriber-account.component.html',
  styleUrls: ['./create-subscriber-account.component.css']
})
export class CreateSubscriberAccountComponent implements OnInit {
  activePasswordComponant = false;
  activePurchaseComponant = false;
  isubcriberDetials: ISubscriberDetials | undefined | null;
  isubscriberPssword: ISubscriberPassword | undefined | null;
  subscriptionId: number | undefined;
  sendToAccountCreate:ISubscriberDetials | undefined | null;

  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSubscriptionIdFormRoute();
  }

  getSubscriptionIdFormRoute() {
    const id = this._activatedRoute.snapshot.params['subscriptionId'];
    this.subscriptionId = Number(id);
  }


  showPasswordHideUserDetails(showPasswordComponant: boolean) {
    this.activePasswordComponant = showPasswordComponant;
  }

  getUserDetials(inputUserDetailsComponant: ISubscriberDetials) {
    this.isubcriberDetials = inputUserDetailsComponant;
  }

  showUserDetialsComponant(show: boolean) {
    this.activePasswordComponant = show;
  }
  getsubscriberPassword(inputSubscriberPassword: ISubscriberPassword) {
    this.isubscriberPssword = inputSubscriberPassword;
  }

  getSubscriberProfile(input:ISubscriberDetials){
    if(input!==null){
      this.sendToAccountCreate=input;
    }
  }
}
