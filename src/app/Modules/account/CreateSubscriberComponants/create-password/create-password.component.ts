import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISubscriberDetials, ISubscriberPassword } from '../Interfaces/isubscriber-detials';
import { ICreateSubscriberDto } from '../Interfaces/icreate-subscriber-dto';
import { UserMasterServiceProxy } from 'src/app/Shared/Service/master-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferServiceService } from 'src/app/Shared/Service/data-transfer-service.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {

  createUserPassword!: FormGroup;
  submmited = false;
  hidePasswordcomponant$ = false;
  isubscriberPassword: ISubscriberPassword | undefined | null;
  icreateSubscriberAccount: ICreateSubscriberDto | undefined | null;
  @Output() showUserComponant: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() subscriberPassword: EventEmitter<ISubscriberPassword> = new EventEmitter<ISubscriberPassword>();
  @Input() subscriptionId: number | undefined;
  @Input() icreateSubscriberDto: ISubscriberDetials | undefined | null;
  @Output() sendSubscriberDto: EventEmitter<ISubscriberDetials> = new EventEmitter<ISubscriberDetials>();

  constructor(
    private _userMasterServiceProxy: UserMasterServiceProxy,
    private _dataTransferServiceProxy: DataTransferServiceService,
    private _router: Router,
  ) { }
  ngOnInit(): void {
    this.createPasswordform();
  }


  createPasswordform() {
    this.createUserPassword = new FormGroup({
      Password: new FormControl('', [
        Validators.required, Validators.maxLength(30)
      ]),
      ReEnterPassword: new FormControl('', [
        Validators.required, Validators.maxLength(30)
      ]),
      CompanyName: new FormControl('', [
        Validators.required, Validators.maxLength(30)
      ])
    })
  }

  AddAddressAndCompanyName() {
    this.submmited = true;
    if (this.createUserPassword.valid) {
      this.isubscriberPassword = {
        password: this.createUserPassword.get('Password')?.value,
        companyName: this.createUserPassword.get('CompanyName')?.value
      }
      if (this.subscriptionId !== 0 && this.subscriptionId !== undefined) {
        if (this.isubscriberPassword !== undefined && this.isubscriberPassword !== null
          && this.icreateSubscriberDto !== undefined && this.icreateSubscriberDto !== null) {
          this.icreateSubscriberAccount = {
            userId: 'UserId',
            firstName: this.icreateSubscriberDto.firstName,
            lastName: this.icreateSubscriberDto.lastName,
            email: this.icreateSubscriberDto.email,
            passwordHash: this.isubscriberPassword.password,
            phoneNumber: this.icreateSubscriberDto.phoneNumber,
            roleId: 'fgsfd',
            companyId: 'hdfghdf',
            coumpanyName: this.isubscriberPassword.companyName,
            subscriptionId: this.subscriptionId,
          }

          if (this.icreateSubscriberAccount !== undefined && this.icreateSubscriberAccount !== null) {
            this._userMasterServiceProxy.createSubseriberAccount(this.icreateSubscriberAccount).subscribe({
              next: (res) => {
                this._dataTransferServiceProxy.setSubscriptionDetails(
                  res.userId,
                  res.planType,
                  res.subscriptionAmmount,
                  res.total,
                  res.email,
                  res.companySubscriptionId,
                  res.subscriptionId,
                  res.companyId
                );
                this._router.navigate(['/transaction/checkout',
                  res.verificationToken]);
              }
            })
          }

          //implement when payment integration complete
          //this.subscriberPassword.emit(this.isubscriberPassword);
        }
      }

    }


  }

  goBack() {
    if (this.icreateSubscriberDto !== undefined && this.icreateSubscriberDto !== null) {
      this.hidePasswordcomponant$ = false;
      this.showUserComponant.emit(this.hidePasswordcomponant$);
      this.sendSubscriberDto.emit(this.icreateSubscriberDto);
    }

  }
}
