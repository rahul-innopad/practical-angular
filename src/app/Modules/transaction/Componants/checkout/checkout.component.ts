import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferServiceService } from 'src/app/Shared/Service/data-transfer-service.service';
import { ICheckoutDataInterface } from '../../Interfaces/icheckout-data-interface';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';
//import { CreateTokenCardData, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { } from '../../../../../environments/environments';
import { ScriptLoaderService } from 'src/app/Shared/Service/JsScriptLoaderService/script-loader.service';
import { StripeService, StripeElementsService as element } from 'ngx-stripe';

import { map } from 'rxjs';
declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
 

  checkoutFormGroup!: FormGroup;
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
    private _unityOfWorkService: UnityOfWorkServiceService,
    private _router: Router,
    private _stripeService: StripeService,
    //private document:Document,
    private elementRef: ElementRef,
    private scriptLoader: ScriptLoaderService
  ) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getSubscriptionDetail();
   // this.loadPaymentScript();
  }



  ngAfterViewInit(): void {
    this.loadPaymentScript();
    this.setupStripeElement();
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
    const addButton = document.querySelector("#btnAddCard");
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
            console.log(token);
            // Submit API with cardDetails and token
          }
        });
      });
    } else {
      console.error("Button with ID 'btnAddCard' not found.");
    }
  }
  

      // const cardNumberElement = x.create('cardNumber',{
      //   style: style,
      //   placeholder: 'XXXX-XXXX-XXXX-XXXX'
      // });

      // cardNumberElement.mount('#card-number-element');
    //});


  //}

  loadPaymentScript(): void {
    this.scriptLoader.loadScript('assets/Javascripts/checkout.js')
      .then(() => {
        console.log('Payment script loaded successfully');
        // Call any initialization function from payment.js if needed
      })
      .catch((error) => {
        console.error('Error loading payment script:', error);
      });
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

  getParmsValueFromRoute() {
    this._activatedRoute.params.subscribe((parms) => {
      this.CompanyId = parms['companyId'];
    })
  }


  createCheckoutForm() {
    this.checkoutFormGroup = new FormGroup({
      CardHolderName: new FormControl('', [
        Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z ]+$/)
      ]),
      CardNumber: new FormControl('', [
        Validators.required, Validators.pattern('[0-9]{16,16}')
      ]),
      CardExpiryMonth: new FormControl('', [
        Validators.required, Validators.pattern(/^[0-9]\d+$/)
      ]),
      CardExpiryYear: new FormControl('', [
        Validators.required, Validators.pattern(/^[0-9]\d+$/)
      ]),
      CVVNumber: new FormControl('', [
        Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(3)
      ])
    })
  }



  //pattern="[0-9\s]{16,16}"
  onSubmit() {
    this.submit = true;
    if (this.checkoutFormGroup.valid) {
      if (this.userId !== undefined && this.subscriptionType !== undefined && this.userEmailId && this.companySubscriptionId !== undefined
        && this.CompanyId !== undefined
      ) {
        this.icheckoutDetailsInterface = {
          userId: this.userId,
          email: this.userEmailId,
          cardDetials: {
            name: this.checkoutFormGroup.get('CardHolderName')?.value,
            cardNumber: this.checkoutFormGroup.get('CardNumber')?.value,
            expiryYear: this.checkoutFormGroup.get('CardExpiryMonth')?.value,
            expiryMonth: this.checkoutFormGroup.get('CardExpiryYear')?.value,
            cvv: this.checkoutFormGroup.get('CVVNumber')?.value
          },
          companyId: this.CompanyId,
          planType: this.subscriptionType,
          subscriptionId: Number(this.subscriptionId),
          companySubscriptionId: Number(this.companySubscriptionId)
        }

        var stripe = Stripe('pk_test_51MySyeEoRbJtPRX1X5ZsZJ2dk7iSXH0vQn360tonMZ0YvECZwX8wBJMvfIjKNB51EoDTL9p8vUI4qt8sid5xk4ra00W6gM7eVZ');


        var element = stripe.element();

        var cardNumber = element.create('cardNumber');
        cardNumber.mount(this.icheckoutDetailsInterface.cardDetials.cardNumber);
        var cardExpiry = element.create('cardExpiry');
        cardExpiry.mount('#card-expiry');
        var cardCvc = element.create('cardCvc');
        cardCvc.mount('#card-cvc');



        stripe.createToken(cardNumber).subscribe({
          next: (res: any) => {
            console.log(res.token.id)
          }
        })


        // const scards:CreateTokenCardData= {
        //   number: this.checkoutFormGroup.get('CardNumber')?.value,
        //   name: this.checkoutFormGroup.get('CardHolderName')?.value,
        //   exp_year: this.checkoutFormGroup.get('CardExpiryMonth')?.value,
        //   exp_month: this.checkoutFormGroup.get('CardExpiryYear')?.value,
        //   cvc: this.checkoutFormGroup.get('CVVNumber')?.value
        // }


        if (this.icheckoutDetailsInterface) {
          this._unityOfWorkService.subscriptionServiceProxy.paymentCheckoutMasterService(this.icheckoutDetailsInterface).subscribe({
            next: (res) => {
              this._router.navigate(['/']);
            }
          })
        }
      }

    }


  }


}


