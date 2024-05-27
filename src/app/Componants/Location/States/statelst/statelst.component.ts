import { Component, OnInit } from '@angular/core';
import { IStateListDto } from '../Interface/istate-list-dto';
import { MasterServiceService } from 'src/app/Shared/Service/master-service.service';
import { ICountryListDto } from '../../Country/Interface/icountry-list-dto';
import { ICreateStateDto } from '../Interface/icreate-state-dto';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';

@Component({
  selector: 'app-statelst',
  templateUrl: './statelst.component.html',
  styleUrls: ['./statelst.component.css']
})
export class StatelstComponent implements OnInit {

  stateList: IStateListDto[] = [];
  countryList: ICountryListDto[] = [];
  icreateStateDto: ICreateStateDto | undefined | null;
  icreateStateListDto: IStateListDto | undefined | null;
  loggerEmail: string | undefined | null;

  constructor(
    private _unityOfWorkService: UnityOfWorkServiceService
  ) { }
  ngOnInit(): void {
    this.getState();
    this.getCountry();
  }

  getState() {
    this._unityOfWorkService.stateMasterServiceProxy.getListStateService().subscribe({
      next: (res) => {
        this.stateList = res;
        this.stateList = this.stateList.map(x => {
          return {
            ...x,
            isEdit: false
          }
        })
      }
    })
  }

  addState() {
    this.icreateStateListDto = {
      stateId: 0,
      stateName: '',
      createdOn: '',
      createdBy: '',
      countryId: 0,
      country: '',
      isEdit: true,
      countryName: ''
    }
    this.stateList.unshift(this.icreateStateListDto);
  }

  Submit(state: IStateListDto) {
    this.loggerEmail = this._unityOfWorkService.masterService.getEmailId();
    if (this.loggerEmail !== undefined && this.loggerEmail !== null) {
      this.icreateStateDto = {
        stateId: state.stateId,
        stateName: state.stateName,
        createdBy: this.loggerEmail,
        countryId: state.countryId
      }
      if (this.icreateStateDto.stateName !== null || this.icreateStateDto.stateName !== undefined) {
        if (this.icreateStateDto.stateId === 0) {
          this._unityOfWorkService.stateMasterServiceProxy.createStateService(this.icreateStateDto).subscribe({
            next: (res) => {
              this.getState();
              alert(res);
            },
            error: (err) => {
              alert(err.error.error)
            }
          })
        }
        else{
          this._unityOfWorkService.stateMasterServiceProxy.updateStateService(this.icreateStateDto).subscribe({
            next: (res) => {
              this.getState();
              alert(res);
            },
            error: (err) => {
              alert(err.error.error)
            }
          })
        }
      }
    }

  }

  editstate(state: IStateListDto) {
    state.isEdit = true;
  }

  Reset(isEdit: boolean) {
    isEdit = false;
    this.getState();
  }

  getCountry() {
    this._unityOfWorkService.countryMasterServiceProxy.getListCountryService().subscribe({
      next: (res) => {
        this.countryList = res;
      }
    })
  }
}
