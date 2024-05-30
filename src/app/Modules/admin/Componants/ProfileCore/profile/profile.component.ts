import { Component, OnInit } from '@angular/core';
import { IUserProfileDto } from '../Interface/iuser-profile-dto';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';
import { UserMasterServiceProxy } from 'src/app/Shared/Service/master-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  iuserProfileDto: IUserProfileDto | undefined | null;
  loggerEmailId: string | undefined | null;
  CompanyId: string | undefined | null;

  constructor(
    private _unityOfWorkService: UnityOfWorkServiceService,
    private _userMasterServiceProxy:UserMasterServiceProxy
  ) { }
  ngOnInit(): void {
    this.getLoggerInformation();
  }

  getLoggerInformation() {
    if (this._unityOfWorkService.masterService.getLoggedIn()) {
      this.loggerEmailId = this._unityOfWorkService.masterService.getEmailId();
      this.CompanyId = this._unityOfWorkService.masterService.getCompanyId();
      if (this.loggerEmailId !== null && this.loggerEmailId !== undefined
        && this.CompanyId !== null && this.CompanyId !== undefined) {
        this.getProfileDetials(this.loggerEmailId, this.CompanyId);
      }
    }

  }
  getProfileDetials(email: string, comapnyId: string) {
    this._userMasterServiceProxy.getUserProfileDto(email, comapnyId).subscribe({
      next: (response) => {
        this.iuserProfileDto = response;
        console.log(response)
      }
    })
  }

}
