import { Component } from '@angular/core';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  role:string=''

  constructor(
    private _unitiyOfWorkService:UnityOfWorkServiceService
  ){}

  ngOnInit(): void {
    
  }

  isidebarCollectionItem:any[]=[
    {
      itemsIdentifier:'user-management-nav',
      itemIconClass:'bi bi-person-rolodex',
      itemKey:'User Managments',
      itemsValue:[
        {
          routerLinkValue:'/Admin/users-lst',
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
      routerLinkValue:'/Admin/profile',
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
