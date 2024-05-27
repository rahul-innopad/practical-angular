import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISubscriberDetials } from '../Interfaces/isubscriber-detials';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']
})
export class AccountCreationComponent implements OnInit {

  createUserDetials!: FormGroup;
  submmited = false;
  hideAccoutCreationComponant$ = false;
  activePasswordComponant$ = true;
  isubsciberDetials: ISubscriberDetials | undefined | null;
  @Output() userAccountDetails: EventEmitter<ISubscriberDetials> = new EventEmitter<ISubscriberDetials>();
  @Output() hiddenConfrimation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showPasswordComponant: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() subscriberAccountDeials: ISubscriberDetials | undefined | null;
  constructor(

  ) { }
  ngOnInit(): void {
    this.createAccount();
    this.valuePatcher();
  }

  valuePatcher() {
    if (this.subscriberAccountDeials !== null && this.subscriberAccountDeials !== null) {
      this.createUserDetials.patchValue({
        FirstName: this.subscriberAccountDeials?.firstName,
        LastName: this.subscriberAccountDeials?.lastName,
        EmailAddress: this.subscriberAccountDeials?.email,
        PhoneNumber: this.subscriberAccountDeials?.phoneNumber
      })
    }
  }

  createAccount() {
    this.createUserDetials = new FormGroup({
      FirstName: new FormControl('', [
        Validators.required, Validators.maxLength(30), Validators.pattern('[A-Za-z\s]+')
      ]),
      LastName: new FormControl('', [
        Validators.required, Validators.maxLength(30), Validators.pattern('[A-Za-z\s]+')
      ]),
      EmailAddress: new FormControl('', [
        Validators.required, Validators.email
      ]),
      PhoneNumber: new FormControl('', [
        Validators.required, Validators.pattern('[0-9]{10}')
      ])
    })
  }

  AddAccountDetials() {
    this.submmited = true;
    if (this.createUserDetials.valid) {
      this.isubsciberDetials = {
        firstName: this.createUserDetials.get('FirstName')?.value,
        lastName: this.createUserDetials.get('LastName')?.value,
        email: this.createUserDetials.get('EmailAddress')?.value,
        phoneNumber: this.createUserDetials.get('PhoneNumber')?.value
      }
      if (this.isubsciberDetials !== undefined && this.isubsciberDetials !== null) {
        this.userAccountDetails.emit(this.isubsciberDetials);
        this.hiddenConfrimation.emit(this.hideAccoutCreationComponant$);
        this.showPasswordComponant.emit(this.activePasswordComponant$)
      }
    }
  }
}
