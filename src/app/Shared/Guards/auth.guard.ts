import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { MasterServiceService } from '../Service/master-service.service';
import { Injectable } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(
    private _masterService: MasterServiceService,
    private _router: Router,
  ) { }

  canActivate(): boolean {
    const isLoggedIn = this._masterService.getLoggedIn();
    const expiry = this._masterService.isTokenValid();
    if (isLoggedIn) {
      if (expiry) {
        return true;
      }
      alert('Please logifirst');
      this._router.navigate(['/']);
      window.location.reload();
      return false;
    }
    else {
      this._router.navigate(['/']);
      return false;
    }
  }
}