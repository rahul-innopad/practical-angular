import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RoleMasterServiceProxy, UserMasterServiceProxy } from 'src/app/Shared/Service/master-service.service';
import { ICreateUsersDto } from '../Interfaces/icreate-users-dto';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';
import { IUserListDto } from 'src/app/Componants/UserMannger/Interface/iuser-list-dto';
import { IUserListsDto } from '../Interfaces/iuser-lists-dto';
import { IUpdateUserDto } from '../Interfaces/iupdate-user-dto';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy {

  createUsersFormGroup!: FormGroup;
  submmited = false;
  rolelst: any[] = [];
  icreateUserDto: ICreateUsersDto | undefined | null;
  iupdateUserDto: IUpdateUserDto | undefined | null;
  @Output() updateUserList: EventEmitter<any> = new EventEmitter<any>();
  loggerEmail: string | undefined | null;
  companyId: string | undefined | null;
  @Input() updateUserInput: IUserListsDto | undefined;
  submitValue = 'Submit';

  constructor(
    private _roleMasterServiceProxy: RoleMasterServiceProxy,
    private _hideModel: BsModalRef,
    private _userMasterServiceProxy: UserMasterServiceProxy,
    private _unityOfWorkService: UnityOfWorkServiceService
  ) { }


  ngOnInit(): void {
    this.getAspNetRole();
    this.createUsers();
    this.isLoggedInIniciateService();
  }

  isLoggedInIniciateService() {
    if (this._unityOfWorkService.masterService.getLoggedIn()) {
      this.loggerEmail = this._unityOfWorkService.masterService.getEmailId();
      this.companyId = this._unityOfWorkService.masterService.getCompanyId();
    }

    //
    this.checkForUpdateAsync()
  }

  checkForUpdateAsync() {
    if (this.updateUserInput?.id !== null && this.updateUserInput !== undefined) {
      this.patchValueToUpdate(this.updateUserInput);
      this.submitValue = 'Update';
    }
  }

  createUsers() {
    this.createUsersFormGroup = new FormGroup({
      UserId: new FormControl(null),
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
      ]),
      RoleId: new FormControl(null),
      Password: new FormControl('Ram12345@'),
      UserAddress: new FormControl(null)
    })
  }

  getAspNetRole() {
    this._roleMasterServiceProxy.getRolseListService().subscribe({
      next: (res) => {
        this.rolelst = res;
      }
    })
  }

  onUserSubmition() {
    this.submmited = true;
    if (this.createUsersFormGroup.valid) {
      if (this.loggerEmail !== undefined && this.loggerEmail !== null
        && this.companyId !== undefined && this.companyId !== null) {
        this.icreateUserDto = {
          firstName: this.createUsersFormGroup.get('FirstName')?.value,
          lastName: this.createUsersFormGroup.get('LastName')?.value,
          phoneNumber: this.createUsersFormGroup.get('PhoneNumber')?.value,
          passwordHash: this.createUsersFormGroup.get('Password')?.value,
          email: this.createUsersFormGroup.get('EmailAddress')?.value,
          roleId: this.createUsersFormGroup.get('RoleId')?.value,
          userAddressDto: this.createUsersFormGroup.get('UserAddress')?.value,
          loggerUserId: this.loggerEmail,
          companyId: this.companyId
        }

        if (this.createUsersFormGroup.get('UserId')?.value != null) {
          this.iupdateUserDto = {
            userId:this.createUsersFormGroup.get('UserId')?.value,
            firstName: this.createUsersFormGroup.get('FirstName')?.value,
            lastName: this.createUsersFormGroup.get('LastName')?.value,
            phoneNumber: this.createUsersFormGroup.get('PhoneNumber')?.value,
            passwordHash: this.createUsersFormGroup.get('Password')?.value,
            email: this.createUsersFormGroup.get('EmailAddress')?.value,
            roleId: this.createUsersFormGroup.get('RoleId')?.value,
            loggerUserId: this.loggerEmail,
            companyId: this.companyId
          }
          if(this.iupdateUserDto!==undefined && this.iupdateUserDto!==null){
            this._userMasterServiceProxy.updateUserAccountBySubscriber(this.iupdateUserDto).subscribe({
              next: (res) => {
                alert(res.message);
                this.hideform();
                this.updateUserList.emit('ok');
              },
              error: (err) => {
                alert(err)
              }
            })
          }
        }
        else {
          if (this.icreateUserDto !== undefined && this.icreateUserDto !== null) {
            this._userMasterServiceProxy.createUserAccountBySubscriber(this.icreateUserDto).subscribe({
              next: (res) => {
                alert(res.message)
                this.hideform();
                this.updateUserList.emit('ok');
              },
              error: (err) => {
                alert(err)
              }
            })
          }
        }
      }


    }
  }

  patchValueToUpdate(input: IUserListsDto) {
    this.createUsersFormGroup.patchValue({
      UserId: input.id,
      FirstName: input.firstName,
      LastName: input.lastName,
      PhoneNumber: input.phoneNumber,
      EmailAddress: input.email,
      RoleId: input.roles.map(x => x.roleId)

    })
  }

  hideform() {
    this._hideModel.hide();
  }

  ngOnDestroy(): void {
    this.isLoggedInIniciateService();
  }


}
