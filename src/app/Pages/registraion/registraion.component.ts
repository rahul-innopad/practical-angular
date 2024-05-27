import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICityListDto } from 'src/app/Componants/Location/City/Interface/icity-list-dto';
import { ICountryListDto } from 'src/app/Componants/Location/Country/Interface/icountry-list-dto';
import { IStateListDto } from 'src/app/Componants/Location/States/Interface/istate-list-dto';
import { DataTransferServiceService } from 'src/app/Shared/Service/data-transfer-service.service';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';

@Component({
  selector: 'app-registraion',
  templateUrl: './registraion.component.html',
  styleUrls: ['./registraion.component.css']
})
export class RegistraionComponent implements OnInit {


  registrationFormGroup!: FormGroup;
  submmited = false;
  countrylst: ICountryListDto[] = [];
  statelst: IStateListDto[] = [];
  citylst: ICityListDto[] = [];
  constructor(
    private _unityOfWork: UnityOfWorkServiceService,
    private _dataTransferService:DataTransferServiceService
  ) { }
  ngOnInit(): void {
    this.createUserForm();
    this.getCountry();
  }


  createUserForm() {
    this.registrationFormGroup = new FormGroup({
      UserId: new FormControl(),
      Firstname: new FormControl('', [
        Validators.required, Validators.maxLength(30), Validators.pattern('[A-Za-z\s]+')
      ]),
      LastName: new FormControl('', [
        Validators.required, Validators.maxLength(30), Validators.pattern('[A-Za-z\s]+')
      ]),
      EmailId: new FormControl('', [
        Validators.required, Validators.email
      ]),
      Password: new FormControl('', [
        Validators.required
      ]),
      Phone: new FormControl('', [
        Validators.required, Validators.pattern('[0-9]{10}')
      ]),
      Address: new FormControl(),
      CountryId: new FormControl(0),
      StateId: new FormControl(0),
      CityId:new FormControl(0),
      CompanyName:new FormControl('',[
        Validators.required
      ])
    })
  }

  onRegister() {
    this.submmited = true;
    //alert(this._dataTransferService.getNumber())
    if (this.registrationFormGroup.valid) {
      alert('hskdjhfkjhasdf');
    }
  }

  getCountry() {
    this._unityOfWork.countryMasterServiceProxy.getListCountryService().subscribe({
      next: (res) => {
        this.countrylst = res;
      }
    })
  }

  getStateByContryId(countryId: any) {
    this._unityOfWork.stateMasterServiceProxy.getStateByCountryIdService(countryId).subscribe({
      next: (res) => {
        this.statelst = res;
      }
    })
  }

  getCityByStateID(stateId: any) {
    this._unityOfWork.cityMasterServiceProry.getCityByStateIdService(stateId).subscribe({
      next: (res) => {
        this.citylst = res;
      }
    })
  }


}
