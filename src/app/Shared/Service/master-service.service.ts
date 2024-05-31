import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountryListDto } from '../../Componants/Location/Country/Interface/icountry-list-dto';
import { environment } from 'src/environments/environments';
import { ICreateCountryDto } from '../../Componants/Location/Country/Interface/icreate-country-dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { IStateListDto } from '../../Componants/Location/States/Interface/istate-list-dto';
import { ICreateStateDto } from '../../Componants/Location/States/Interface/icreate-state-dto';
import { ICityListDto } from 'src/app/Componants/Location/City/Interface/icity-list-dto';
import { ICreateCityDto } from 'src/app/Componants/Location/City/Interface/icreate-city-dto';
import { IUserListDto } from 'src/app/Componants/UserMannger/Interface/iuser-list-dto';
import { ISubscriptionListDto } from 'src/app/Componants/SubscriptionManager/Interface/isubscription-list-dto';
import { IUserListsDto } from 'src/app/Modules/admin/Componants/Users/Interfaces/iuser-lists-dto';
import { IUserProfileDto } from 'src/app/Modules/admin/Componants/ProfileCore/Interface/iuser-profile-dto';
import { ICreateSubscriberDto } from 'src/app/Modules/account/CreateSubscriberComponants/Interfaces/icreate-subscriber-dto';
import { ICreateUsersDto } from 'src/app/Modules/admin/Componants/Users/Interfaces/icreate-users-dto';
import { IUpdateUserDto } from 'src/app/Modules/admin/Componants/Users/Interfaces/iupdate-user-dto';
import { ICheckoutDataInterface } from 'src/app/Modules/transaction/Interfaces/icheckout-data-interface';
import { ApiConstants } from '../Constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {

  API_ENDPOINT = environment.API_ENDPOINT;
  private readonly TOKEN_KEY = "token";
  private readonly EXPIRATION_KEY = 'token-expiration';
  private readonly jwtHelper: JwtHelperService;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.jwtHelper = new JwtHelperService();
  }


  //Loggin Service------


  userLoggingService(email_: string, password_: string): Observable<any> {
    let url_ = this.API_ENDPOINT + 'Login/User-login?';
    if (email_ === undefined || email_ === null)
      alert("email_ cannot be null or Undefined");
    else if (password_ === undefined || password_ === null)
      alert("Password cannot be Null or Undefined")

    url_ += "emailId=" + encodeURIComponent("" + email_) + "&" + "password=" + encodeURIComponent("" + password_);
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }

    return this._http.post(url_, null, options_);
  }

  userLoggedOutService(email_: string): Observable<any> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.LoggedOut_Endpoint}`;
    if (email_ === undefined || email_ === null)
      alert("email_ cannot be null or Undefined");
    url_ += "emailId=" + encodeURIComponent("" + email_) + "&" ;
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }

    return this._http.patch(url_, null, options_);
  }


  //local-storage-work
  setToken(token: string) {
    const tokenExpiry = this.jwtHelper.decodeToken(token);
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EXPIRATION_KEY, tokenExpiry.exp);
  }

  getLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  isTokenValid(): boolean {
    const tokenExpiration = localStorage.getItem(this.EXPIRATION_KEY);
    if (!tokenExpiration || new Date(tokenExpiration) > new Date()) {
      this.removeToken();
      this._router.navigate(['/']);
      return false;
    }
    return true;
  }

  removeToken() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.EXPIRATION_KEY);
      this._router.navigate(['/'])
    }
  }

  getEmailId(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const email = decodedToken.email;
      return email;
    }
    return null;
  }

  getRole(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken.role;
      return role;
    }
    return null;
  }

  getCompanyId(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const companyId = decodedToken.CompanyId;
      return companyId;
    }
    return null;
  }


}


@Injectable({
  providedIn: 'root'
})
export class CountryMasterServiceProxy {

  API_ENDPOINT = environment.API_ENDPOINT;

  constructor(
    private _http: HttpClient
  ) { }

  getListCountryService(): Observable<ICountryListDto[]> {
    let url_ = this.API_ENDPOINT + 'Country/get-all-country';

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.get<ICountryListDto[]>(url_, options_);
  }

  createCountryService(body_: ICreateCountryDto): Observable<any> {
    let url_ = this.API_ENDPOINT + 'Country/Create-countries';

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }

    return this._http.post(url_, body_, options_);
  }

  updateCountryService(body_: ICreateCountryDto | undefined | null): Observable<any> {
    let url_ = this.API_ENDPOINT + 'Country/update-country';
    if (body_ === undefined && body_ === null)
      alert("Body cannot be null or Undefined");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }

    return this._http.put(url_, body_, options_);
  }

}

@Injectable({
  providedIn: "root"
})
export class StateMasterServiceProxy {

  API_ENDPOINT = environment.API_ENDPOINT;

  constructor(
    private _http: HttpClient
  ) { }

  getListStateService(): Observable<IStateListDto[]> {
    let url_ = this.API_ENDPOINT + 'State/get-all-State';
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.get<IStateListDto[]>(url_, options_);
  }

  createStateService(body_: ICreateStateDto): Observable<any> {
    let url_ = this.API_ENDPOINT + 'State/Create-states';
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }

    return this._http.post(url_, body_, options_);
  }

  updateStateService(body_: ICreateStateDto): Observable<any> {
    let url_ = this.API_ENDPOINT + 'State/update-State';
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }

    return this._http.put(url_, body_, options_);
  }



  getStateByCountryIdService(countryId_: number): Observable<IStateListDto[]> {
    let url_ = this.API_ENDPOINT + 'State/get-all-State-by-countryId?';
    url_ += 'countryId=' + encodeURIComponent("" + countryId_);
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.get<IStateListDto[]>(url_, options_);
  }
}

@Injectable({
  providedIn: "root"
})
export class CityMasterServiceProxy {

  API_ENDPOINT = environment.API_ENDPOINT;

  constructor(
    private _http: HttpClient
  ) { }

  getListCityService(): Observable<ICityListDto[]> {
    let url_ = this.API_ENDPOINT + 'City/get-all-City';
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.get<ICityListDto[]>(url_, options_);
  }

  addCityService(body_: ICreateCityDto): Observable<any> {
    let url_ = this.API_ENDPOINT + 'City/Create-Citys';
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.post(url_, body_, options_);
  }

  updateCityService(body_: ICreateCityDto): Observable<any> {
    let url_ = this.API_ENDPOINT + 'City/update-City';
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.put(url_, body_, options_);
  }

  getCityByStateIdService(stateId_: number): Observable<ICityListDto[]> {
    let url_ = this.API_ENDPOINT + 'City/get-all-City-by-stateId?';
    url_ += 'stateId=' + encodeURIComponent("" + stateId_);
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.get<ICityListDto[]>(url_, options_);
  }
}


@Injectable({
  providedIn: "root"
})
export class UserMasterServiceProxy {
  API_ENDPOINT = environment.API_ENDPOINT;

  constructor(
    private _http: HttpClient
  ) { }

  getUserListService(emailId_: string, companyId_: string): Observable<IUserListsDto[]> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.GetUsersByOwnerId_EndPoint}`;
    url_ += "id=" + encodeURIComponent("" + emailId_) + "&" + "companyId=" + encodeURIComponent("" + companyId_);
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.get<IUserListsDto[]>(url_, options_);
  }

  getUserProfileDto(emailId_: string, companyId_: string): Observable<IUserProfileDto> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.GetUserProfile_EndPoint}`;
    url_ += "emailId=" + encodeURIComponent("" + emailId_) + "&" + "companyId=" + encodeURIComponent("" + companyId_);
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.get<IUserProfileDto>(url_, options_);
  }

  createSubseriberAccount(body_: ICreateSubscriberDto): Observable<any> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.CreateSubscriberAccount_EndPoint}`;
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.post(url_, body_, options_);
  }

  createUserAccountBySubscriber(body_: ICreateUsersDto): Observable<any> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.CreateUserAccountSubscriber_EndPoint}`;
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.post(url_, body_, options_);
  }
  updateUserAccountBySubscriber(body_: IUpdateUserDto): Observable<any> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.UpdateUserAccountBySubscriber_EndPoint}`;

    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.put(url_, body_, options_);
  }

  deactiveUserbysubscriber(loggerId: string, companyId: string, userId: string): Observable<any> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.DeactiveUserAccountBySubscriber_EndPoint}`;
    url_ += "userId=" + encodeURIComponent("" + userId) + "&" + "loggerId=" + encodeURIComponent("" + loggerId) +
      "&" + "companyId=" + encodeURIComponent("" + companyId);
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.patch(url_, null, options_);
  }
}

//SubscriptionPlan/get-subscription-plan
@Injectable({
  providedIn: "root"
})
export class SubscriptionPlanMasterServiceProxy {
  API_ENDPOINT = environment.API_ENDPOINT;

  constructor(
    private _http: HttpClient
  ) { }

  getSubscriptionListService(): Observable<ISubscriptionListDto[]> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.GetSubscriptionList_EndPoint}`;
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.get<ISubscriptionListDto[]>(url_, options_);
  }
  getSubscriptionListByPlanTypeService(): Observable<any[]> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.GetSubscriptionPlanByPlanType_EndPoint}`;
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.get<any[]>(url_, options_);
  }

  getRemainUserForSubscriberToAddService(emailId_: string, companyId_: string): Observable<number> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.GetRemainUserForSubscriberToAdd_EndPoint}`;
    url_ += "email=" + encodeURIComponent("" + emailId_) + "&" + "companyId=" + encodeURIComponent("" + companyId_);
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.get<number>(url_, options_);
  }


  paymentCheckoutMasterService(body_: ICheckoutDataInterface): Observable<any> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.PaymentCheckout_EndPoint}`;
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.post(url_, body_, options_);
  }

  getCompanySubscriptionListService(emailId_:string,companyId_:string): Observable<any[]> {
    let url_ = this.API_ENDPOINT + `${ApiConstants.GetCompanySubscriptionDetails_Endoint}`;
    url_ += "emailId=" + encodeURIComponent("" + emailId_) + "&" + "companyId=" + encodeURIComponent("" + companyId_);
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.get<any[]>(url_, options_);
  }
}

@Injectable({
  providedIn: "root"
})
export class RoleMasterServiceProxy {
  API_ENDPOINT = environment.API_ENDPOINT;
  constructor(
    private _http: HttpClient
  ) { }

  getRolseListService(): Observable<any[]> {
    let url_ = this.API_ENDPOINT + 'Role/service/Get-all-role';
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }

    return this._http.get<any[]>(url_, options_);
  }
}

@Injectable({
  providedIn: "root"
})
export class PaymentMasterServiceProxy{
  API_ENDPOINT = environment.API_ENDPOINT;

  constructor(
    private _http: HttpClient
  ) { }

  paymentCheckoutMasterService(body_: ICheckoutDataInterface): Observable<any> {
    let url_ = this.API_ENDPOINT + 'Payment/service/payment-checkout';
    url_ = url_.replace(/[?&]$/, "");

    let options_ = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    return this._http.post(url_, body_, options_);
  }

}