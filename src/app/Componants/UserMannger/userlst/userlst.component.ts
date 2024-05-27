import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';
import { IUserListDto } from '../Interface/iuser-list-dto';

@Component({
  selector: 'app-userlst',
  templateUrl: './userlst.component.html',
  styleUrls: ['./userlst.component.css']
})
export class UserlstComponent implements OnInit {

  bsModelRef!: BsModalRef;
  loggerEmail: string | undefined | null;
  iuserListDto: IUserListDto[] = [];

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
      if (this.loggerEmail !== null && this.loggerEmail !== undefined) {
        this.getUserList(this.loggerEmail);
      }
    }
  }

  getUserList(email: string | undefined | null) {
    if (email !== null && email !== undefined) {
      // this._unityOfWorkService.userMasterServiceProxy.getUserListService(email).subscribe({
      //   next: (response) => {
      //     this.iuserListDto = response;
      //   }
      // })
    }
  }

  AddNewUser() {
    this.bsModelRef = this._bsModelService.show(CreateUserComponent, {
      class: "modal-lg",
    })
  }
}
