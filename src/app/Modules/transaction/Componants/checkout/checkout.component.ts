import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferServiceService } from 'src/app/Shared/Service/data-transfer-service.service';
import { ICheckoutDataInterface } from '../../Interfaces/icheckout-data-interface';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';
import { ScriptLoaderService } from 'src/app/Shared/Service/JsScriptLoaderService/script-loader.service';
import { StripeService, StripeElementsService as element } from 'ngx-stripe';
import { PaymentMasterServiceProxy } from 'src/app/Shared/Service/master-service.service';

declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 

  submit = false;
  subscriptionType: string | undefined;
  subscriptionAmmount: string | undefined;
  totalAmmount: string | undefined;

  userEmailId: string | undefined;
  userId: string | undefined;
  subscriptionId: string | undefined;
  CompanyId: string | undefined;
  companySubscriptionId: string | undefined;

  icheckoutDetailsInterface: ICheckoutDataInterface | undefined | null;


  constructor(
    private _dataService: DataTransferServiceService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _stripeService: StripeService,
    //private document:Document,
    private scriptLoader: ScriptLoaderService,
    private paymentServiceProxy:PaymentMasterServiceProxy
  ) { }

  ngOnInit(): void {
    this.getSubscriptionDetail();
   // this.loadPaymentScript();
    this.setupStripeElement();
  }

  getSubscriptionDetail() {
    this.subscriptionType = this._dataService.getSubscriptionDetials()?.subscriptionType;
    this.subscriptionAmmount = this._dataService.getSubscriptionDetials()?.subTotal;
    this.totalAmmount = this._dataService.getSubscriptionDetials()?.total;
    this.userId = this._dataService.getSubscriptionDetials()?.userId;
    this.userEmailId = this._dataService.getSubscriptionDetials()?.email;
    this.companySubscriptionId = this._dataService.getSubscriptionDetials()?.companySubscriptionId;
    this.subscriptionId = this._dataService.getSubscriptionDetials()?.subscriptionId;
    this.CompanyId = this._dataService.getSubscriptionDetials()?.companyId;
  }

  setupStripeElement() {
    // Set the publishable key for Stripe
    this._stripeService.setKey("pk_test_51MySyeEoRbJtPRX1X5ZsZJ2dk7iSXH0vQn360tonMZ0YvECZwX8wBJMvfIjKNB51EoDTL9p8vUI4qt8sid5xk4ra00W6gM7eVZ");
  
    // Create references for card elements
    let cardNumberElement: any;
    let cardExpiryElement: any;
    let cardCvcElement: any;
  
    // Subscribe to elements creation
    this._stripeService.elements().subscribe((elements) => {
      const style = {
        base: {
          fontSize: '16px',
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
        }
      };
  

      // Create and mount card number element
      cardNumberElement = elements.create("cardNumber", {
        style: style,
        placeholder: "Card Number",
      });
      cardNumberElement.mount("#card-number-element1");
  
      // Create and mount card expiry element
      cardExpiryElement = elements.create("cardExpiry", {
        style: style,
      });
      cardExpiryElement.mount("#card-expiry-element1");
  
      // Create and mount card CVC element
      cardCvcElement = elements.create("cardCvc", {
        style: style,
      });
      cardCvcElement.mount("#card-cvc-element1");
    });
  
    // Check if the button exists before adding an event listener
    const addButton = document.getElementById("btnAddCard");
    if (addButton) {
      addButton.addEventListener("click", () => {
        this._stripeService.createToken(cardNumberElement, {
          name: "setname",
        }).subscribe((result: any) => {
          if (result.error) {
            alert(result.error.message);
          } else {
            const cardDetails = result.token.card;
            const token = result.token.id;
            //API calling after create token for card
            
            if (this.userId !== undefined && this.subscriptionType !== undefined && this.userEmailId && this.companySubscriptionId!==undefined
              && this.CompanyId!==undefined
            ){
              this.icheckoutDetailsInterface={
                stripeTokenId: token,
                userId: this.userId,
                email: this.userEmailId,
                planType: this.subscriptionType,
                subscriptionId: Number(this.subscriptionId),
                companySubscriptionId: Number(this.companySubscriptionId),
                totalAmmount: Number(this.totalAmmount),
                companyId: this.CompanyId
              }
              if(this.icheckoutDetailsInterface){
                this.paymentServiceProxy.paymentCheckoutMasterService(this.icheckoutDetailsInterface).subscribe({
                  next: (data: any) => {
                    this._dataService.removeSubscriptionDetails();
                    this._router.navigate(['/'])
                  }
                })
              }
            }
          }
        });
      });
    } else {
      console.error("Button with ID 'btnAddCard' not found.");
    }
  }
  


  getParmsValueFromRoute() {
    this._activatedRoute.params.subscribe((parms) => {
      this.CompanyId = parms['companyId'];
    })
  }
}


