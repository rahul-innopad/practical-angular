import { Component, OnInit } from '@angular/core';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  role:string='';
  loggerRole:string | undefined |null;

  constructor(
    private _unitiyOfWorkService:UnityOfWorkServiceService
  ){}

  ngOnInit(): void {
    this.getInformation();
  }

  getInformation(){
    if(this._unitiyOfWorkService.masterService.getLoggedIn()){
      this.loggerRole=this._unitiyOfWorkService.masterService.getRole();
    }
  }
  isidebarCollectionItem:any[]=[
    {
      itemsIdentifier:'user-management-nav',
      itemIconClass:'bi bi-person-rolodex',
      itemKey:'User Managments',
      itemsValue:[
        {
          routerLinkValue:'/users',
          routerLinkClass:'bi bi-circle',
          routerLinkText:'Users'
        }
      ]
    }
  ]

  isidebarPagesCollection:any[]=[
    {
      itemsIdentifier:'location-nav',
      itemIconClass:'bi bi-geo-fill',
      itemKey:'Location',
      itemsValue:[
        {
          routerLinkValue:'/country',
          routerLinkClass:'bi bi-circle',
          routerLinkText:'Countries Master'
        },
        {
          routerLinkValue:'/state',
          routerLinkClass:'bi bi-circle',
          routerLinkText:'States Master'
        },
        {
          routerLinkValue:'/city',
          routerLinkClass:'bi bi-circle',
          routerLinkText:'City Master'
        }
      ]
    }
  ]

  isidebaritem:any[]=[
    {
      routerLinkValue:'/arthur/member-profile',
      routerLinkClass:'bi bi-person-bounding-box',
      routerLinkText:'Profiles'
    },

  ]


  onLoggedOut(){
    if(this._unitiyOfWorkService.masterService.getLoggedIn()){
      this._unitiyOfWorkService.masterService.removeToken();
    }
  }
}
