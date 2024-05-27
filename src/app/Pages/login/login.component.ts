import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterServiceService } from 'src/app/Shared/Service/master-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinformGroup!: FormGroup;
  submit = false;
  passwordType = 'Password';
  passwordEyeVisibility = true;

  constructor(
    private _masterService: MasterServiceService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.signinformGroup = new FormGroup({
      EmailAddress: new FormControl('', [
        Validators.required, Validators.email
      ]),
      Password: new FormControl('', [
        Validators.required
      ])
    })
  }

  onSubmit() {
    this.submit = true;
    if (this.signinformGroup.valid) {
      const email = this.signinformGroup.get('EmailAddress')?.value;
      const password = this.signinformGroup.get('Password')?.value;

      this._masterService.userLoggingService(email, password).subscribe({
        next: (res) => {
          alert(res.message);
          this._masterService.setToken(res.token);
          this._router.navigate(['/Admin'])
        },
        error:(err)=>{
          alert(err.error.error)
        }
      })
    }
  }

  ChangeTypeToggle() {
    if (this.passwordType === 'Password') {
      this.passwordType = 'text';
      this.passwordEyeVisibility = false;
    }
    else {
      this.passwordType = 'Password';
      this.passwordEyeVisibility = true;
    }
  }

}
