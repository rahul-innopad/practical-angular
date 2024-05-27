import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferServiceService } from 'src/app/Shared/Service/data-transfer-service.service';
import { ICheckoutDataInterface } from '../../Interfaces/icheckout-data-interface';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';

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
    private _router:Router
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
  onSubmit() {
    this.submit = true;
    if (this.checkoutFormGroup.valid) {
      if (this.userId !== undefined && this.subscriptionType !== undefined && this.userEmailId && this.companySubscriptionId!==undefined
        && this.CompanyId!==undefined
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
        if(this.icheckoutDetailsInterface){
          this._unityOfWorkService.subscriptionServiceProxy.paymentCheckoutMasterService(this.icheckoutDetailsInterface).subscribe({
            next:(res)=>{
              this._router.navigate(['/']);
            }
          })
        }
      }

    }
  }
}
