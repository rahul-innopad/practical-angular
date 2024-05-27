import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';
import { IUserListsDto } from '../Interfaces/iuser-lists-dto';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  bsModelRef!: BsModalRef;
  loggerEmail: string | undefined | null;
  companyId: string | undefined | null;
  iuserListDto: IUserListsDto[] = [];
  ramainUsers: number | undefined;
  constructor(
    private _bsModelService: BsModalService,
    private _unityOfWorkService: UnityOfWorkServiceService
  ) { }

  ngOnInit(): void {
    this.isLoggedInIniciateService();
  }


  isLoggedInIniciateService() {
    if (this._unityOfWorkService.masterService.getLoggedIn()) {
      this.loggerEmail = this._unityOfWorkService.masterService.getEmailId();
      this.companyId = this._unityOfWorkService.masterService.getCompanyId();
      if (this.loggerEmail !== null && this.loggerEmail !== undefined) {
        this.getUserList(this.loggerEmail, this.companyId);
        this.getRemainInformation(this.loggerEmail, this.companyId);
      }
    }
  }

  getUserList(email: string | undefined | null, companyId: string | undefined | null) {
    if (email !== null && email !== undefined && companyId !== undefined && companyId !== null) {
      this._unityOfWorkService.userMasterServiceProxy.getUserListService(email, companyId).subscribe({
        next: (response) => {
          this.iuserListDto = response;
          this.iuserListDto = this.iuserListDto.map(x => {
            return {
              ...x,
              isEdit: false
            }
          })
        }
      })
    }
  }

  AddNewUser() {
    this.bsModelRef = this._bsModelService.show(CreateUserComponent, {
      class: "modal-lg",
      animated: true
    });
    this.bsModelRef.content.updateUserList.subscribe((res: any) => {
      this.getUserList(this.loggerEmail, this.companyId);
      this.getRemainInformation(this.loggerEmail, this.companyId);
    })
  }

  getRemainInformation(email: string | undefined | null, companyId: string | undefined | null) {
    if (email !== null && email !== undefined && companyId !== undefined && companyId !== null) {
      this._unityOfWorkService.subscriptionServiceProxy.getRemainUserForSubscriberToAddService(email, companyId).subscribe({
        next: (response) => {
          this.ramainUsers = response;
        }
      })
    }
  }

  editUserDetials(users: IUserListsDto) {
    if (users.isActive) {
      this.bsModelRef = this._bsModelService.show(CreateUserComponent, {
        class: "modal-lg",
        initialState: {
          updateUserInput: users
        }
      });
      this.bsModelRef.content.updateUserList.subscribe((res: any) => {
        this.getUserList(this.loggerEmail, this.companyId);
        this.getRemainInformation(this.loggerEmail, this.companyId);
      })
    }

  }

  changeUserAsctivity(id: string, isActive: boolean) {
    if (id !== null && isActive === true) {
      this.loggerEmail = this._unityOfWorkService.masterService.getEmailId();
      this.companyId = this._unityOfWorkService.masterService.getCompanyId();
      if (this.loggerEmail !== null && this.loggerEmail !== undefined
        && this.companyId !== null && this.companyId !== undefined
      ) {
        this._unityOfWorkService.userMasterServiceProxy.deactiveUserbysubscriber(this.loggerEmail, this.companyId, id).subscribe({
          next: (res) => {
            this.getUserList(this.loggerEmail, this.companyId);
            this.getRemainInformation(this.loggerEmail, this.companyId);
            alert(res);
          }
        })
      }
    }
  }
}
