import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{

  constructor(
    private _bsModelRef:BsModalRef
  ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
  hideUserForms(){
    this._bsModelRef.hide();
  }
}
