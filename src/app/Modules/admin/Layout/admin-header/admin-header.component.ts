
import { Component, OnInit } from '@angular/core';
import { MasterServiceService } from 'src/app/Shared/Service/master-service.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  loggerEmaildId: string | undefined | null;
  sendLoggerEmail: string | undefined;
  loggerRole: string | undefined | null;
  sendLoggerRole: string | undefined;

  constructor(
   
    private _masterService: MasterServiceService,
  ) { }
  ngOnInit(): void {
    this.getLogger();
  }

  getLogger() {
    if (this._masterService.getLoggedIn()) {
      this.loggerEmaildId = this._masterService.getEmailId();
      if (this.loggerEmaildId !== undefined && this.loggerEmaildId !== null) {
        this.sendLoggerEmail = this.loggerEmaildId;
      }
      this.loggerRole = this._masterService.getRole();
      if (this.loggerRole != undefined && this.loggerRole !== null) {
        this.sendLoggerRole = this.loggerRole;
      }
    }
  }

}
