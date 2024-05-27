import { Component, OnInit } from '@angular/core';
import { ICityListDto } from '../Interface/icity-list-dto';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';
import { IStateListDto } from '../../States/Interface/istate-list-dto';
import { ICreateCityDto } from '../Interface/icreate-city-dto';

@Component({
  selector: 'app-city-lst',
  templateUrl: './city-lst.component.html',
  styleUrls: ['./city-lst.component.css']
})
export class CityLstComponent implements OnInit {

  cityList: ICityListDto[] = [];
  stateList: IStateListDto[] = [];
  icreateCityDto: ICreateCityDto | null | undefined;
  icitylistDto: ICityListDto | null | undefined;
  loggerEmailId: string | null | undefined;

  constructor(
    private _unityOfWorkService: UnityOfWorkServiceService
  ) { }

  ngOnInit(): void {
    this.getCitylst();
    this.getState();
  }

  getCitylst() {
    this._unityOfWorkService.cityMasterServiceProry.getListCityService().subscribe({
      next: (response) => {
        this.cityList = response;
        this.cityList = this.cityList.map(x => {
          return {
            ...x,
            isEdit: false
          }
        })
      }
    })
  }

  addCity() {
    this.icitylistDto = {
      cityId: 0,
      cityName: '',
      createdBy: '',
      createdOn: '',
      stateId: 0,
      isEdit: true,
      stateName: ''
    }
    this.cityList.unshift(this.icitylistDto);
  }

  editcity(city: ICityListDto) {
    city.isEdit = true;
  }

  SubmitCity(city: ICityListDto) {
    this.loggerEmailId = this._unityOfWorkService.masterService.getEmailId();
    if (this.loggerEmailId !== undefined && this.loggerEmailId !== null) {
      this.icreateCityDto = {
        cityId: city.cityId,
        cityName: city.cityName,
        createdBy: this.loggerEmailId,
        stateId: city.stateId
      }
      if (this.icreateCityDto !== undefined && this.icreateCityDto !== null) {
        if (this.icreateCityDto.cityId === 0) {
          // Add City
          this._unityOfWorkService.cityMasterServiceProry.addCityService(this.icreateCityDto).subscribe({
            next: (responce) => {
              this.getCitylst();
              alert(responce);
            },
            error: (error) => {
              alert(error.error.error);
            }
          })
        }
        else {
          this._unityOfWorkService.cityMasterServiceProry.updateCityService(this.icreateCityDto).subscribe({
            next: (responce) => {
              this.getCitylst();
              alert(responce);
            },
            error: (error) => {
              alert(error.error.error);
            }
          })
        }
      }
    }
  }

  Reset(city: ICityListDto) {
    city.isEdit = false;
    this.getCitylst();
  }

  getState() {
    this._unityOfWorkService.stateMasterServiceProxy.getListStateService().subscribe({
      next: (data) => {
        this.stateList = data;
      }
    })
  }
}
