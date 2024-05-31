import { Component, ViewChild, ViewChildren } from '@angular/core';
import { UnityOfWorkServiceService } from 'src/app/Shared/Service/unity-of-work-service.service';
import { LogoutComponent } from '../../Shared/ReuseblesComponants/logout/logout.component';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  role:string=''
  @ViewChild(LogoutComponent) logoutComponent!:LogoutComponent
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
    },
    {
      itemsIdentifier:'subscription-management-nav',
      itemIconClass:'bi bi-wallet',
      itemKey:'Subscription',
      itemsValue:[
        {
          routerLinkValue:'/Admin/subscription',
          routerLinkClass:'bi bi-circle',
          routerLinkText:'Subscription'
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
    this.logoutComponent.loggedOut();
  }

}
