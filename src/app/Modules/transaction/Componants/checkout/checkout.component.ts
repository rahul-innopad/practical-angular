import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferServiceService } from 'src/app/Shared/Service/data-transfer-service.service';
import { ICheckoutDataInterface } from '../../Interfaces/icheckout-data-interface';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';
//import { StripeCardComponent, StripeService } from 'ngx-stripe';
//import { CreateTokenCardData, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import {  }  from '../../../../../environments/environments'
declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


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
    private _unityOfWorkService:UnityOfWorkServiceService,
    private _router:Router,
    //private _stripeService:StripeService,
    //private document:Document,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getSubscriptionDetail();
  }

  getSubscriptionDetail() {
    this.subscriptionType = this._dataService.getSubscriptionDetials()?.subscriptionType;
    this.subscriptionAmmount = this._dataService.getSubscriptionDetials()?.subTotal;
    this.totalAmmount = this._dataService.getSubscriptionDetials()?.total;
    this.userId = this._dataService.getSubscriptionDetials()?.userId;
    this.userEmailId=this._dataService.getSubscriptionDetials()?.email;
    this.companySubscriptionId=this._dataService.getSubscriptionDetials()?.companySubscriptionId;
    this.subscriptionId=this._dataService.getSubscriptionDetials()?.subscriptionId;
    this.CompanyId=this._dataService.getSubscriptionDetials()?.companyId;
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
  // onSubmit() {
  //   this.submit = true;
  //   if (this.checkoutFormGroup.valid) {
  //     if (this.userId !== undefined && this.subscriptionType !== undefined && this.userEmailId && this.companySubscriptionId!==undefined
  //       && this.CompanyId!==undefined
  //     ) {
  //       this.icheckoutDetailsInterface = {
  //         userId: this.userId,
  //         email: this.userEmailId,
  //         cardDetials: {
  //           name: this.checkoutFormGroup.get('CardHolderName')?.value,
  //           cardNumber: this.checkoutFormGroup.get('CardNumber')?.value,
  //           expiryYear: this.checkoutFormGroup.get('CardExpiryMonth')?.value,
  //           expiryMonth: this.checkoutFormGroup.get('CardExpiryYear')?.value,
  //           cvv: this.checkoutFormGroup.get('CVVNumber')?.value
  //         },
  //         companyId: this.CompanyId,
  //         planType: this.subscriptionType,
  //         subscriptionId: Number(this.subscriptionId),
  //         companySubscriptionId: Number(this.companySubscriptionId)
  //       }

  //       const scards:CreateTokenCardData= {
  //         number: this.checkoutFormGroup.get('CardNumber')?.value,
  //         name: this.checkoutFormGroup.get('CardHolderName')?.value,
  //         exp_year: this.checkoutFormGroup.get('CardExpiryMonth')?.value,
  //         exp_month: this.checkoutFormGroup.get('CardExpiryYear')?.value,
  //         cvc: this.checkoutFormGroup.get('CVVNumber')?.value
  //       }


  //       if(this.icheckoutDetailsInterface){
          // this._stripeService.createToken(this.card.element,{ 'name':userName }).subscribe((result)=>{
          //   if(result.token){
          //     console.log(result.token.id)
          //   }
          //   else if(result.error){
          //     console.log(result.error)
          //   }
          // })
        //}
        // if(this.icheckoutDetailsInterface){
        //   this._unityOfWorkService.subscriptionServiceProxy.paymentCheckoutMasterService(this.icheckoutDetailsInterface).subscribe({
        //     next:(res)=>{
        //       this._router.navigate(['/']);
        //     }
        //   })
        // }
  //     }

  //   }

    
  // }


  initializeStripe(): void {
    // Initialize Stripe with your Publishable Key
    var stripe = Stripe('pk_test_51MySyeEoRbJtPRX1X5ZsZJ2dk7iSXH0vQn360tonMZ0YvECZwX8wBJMvfIjKNB51EoDTL9p8vUI4qt8sid5xk4ra00W6gM7eVZ');
    
    // Create an instance of Elements
    var elements = stripe.elements();
    
    // Create an instance of the card Element
    var card = elements.create('card');
    
    // Mount the card Element onto the card-number element
    card.mount('#CardNumberIdenetity');
    

    const nativeElement = this.elementRef.nativeElement;
    const element = nativeElement.getElementById('payment-form');

    // Handle form submission
    element.addEventListener('submit', function(event:any) {
      event.preventDefault();
      
      // Use Stripe.js to create a token
      stripe.createToken(card).then(function(result:any) {
        if (result.error) {
          // Error creating token, handle it accordingly
          console.error(result.error.message);
        } else {
          // Token created successfully, handle it accordingly
          console.log(result.token);
        }
      });
    });
  }

  
}


