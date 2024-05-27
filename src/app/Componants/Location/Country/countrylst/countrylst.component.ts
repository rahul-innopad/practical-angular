import { Component, OnInit } from '@angular/core';
import { ICountryListDto } from '../Interface/icountry-list-dto';
import { ICreateCountryDto } from '../Interface/icreate-country-dto';
import { MasterServiceService } from 'src/app/Shared/Service/master-service.service';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';

@Component({
  selector: 'app-countrylst',
  templateUrl: './countrylst.component.html',
  styleUrls: ['./countrylst.component.css']
})
export class CountrylstComponent implements OnInit {

  countryList: ICountryListDto[] = [];
  icreateCountryDto: ICountryListDto | undefined | null;
  loggerEmail: string | null | undefined;
  searchText='';

  constructor(
    private _unityOfWorkService: UnityOfWorkServiceService,
    private _masterService:MasterServiceService
  ) { }
  ngOnInit(): void {
    this.getCountries();
  }


  getCountries() {
    this._unityOfWorkService.countryMasterServiceProxy.getListCountryService().subscribe({
      next: (res) => {
        this.countryList = res;
        this.countryList = this.countryList.map(x => {
          return {
            ...x,
            isEdit: false
          }
        })
      }
    })
  }

  addCountry() {
    this.icreateCountryDto = {
      countryId: 0,
      countryName: '',
      createdOn: '',
      createdBy: '',
      isEdit: true
    }
    this.countryList.unshift(this.icreateCountryDto);
  }

  Submit(country: ICreateCountryDto) {
    this.loggerEmail = this._masterService.getEmailId();
    if (this.loggerEmail !== undefined && this.loggerEmail !== null) {
      country.createdBy = this.loggerEmail;
      if (country.countryId === 0) {
        this._unityOfWorkService.countryMasterServiceProxy.createCountryService(country).subscribe({
          next: (res) => {
            this.getCountries();
            alert(res);
          },
          error: (err) => {
            alert(err.error.error)
          }
        })
      }
      else {
        this._unityOfWorkService.countryMasterServiceProxy.updateCountryService(country).subscribe({
          next: (res) => {
            this.getCountries();
            alert(res);
          },
          error: (err) => {
            alert(err.error.error)
          }
        })
      }
    }

  }

  editCountry(country: ICountryListDto) {
    country.isEdit = true;
  }

  Reset(IsEdit: boolean) {
    IsEdit = false;
    this.getCountries();
  }
}
