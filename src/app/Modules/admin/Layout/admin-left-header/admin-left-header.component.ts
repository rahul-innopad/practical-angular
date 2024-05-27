import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-left-header',
  templateUrl: './admin-left-header.component.html',
  styleUrls: ['./admin-left-header.component.css']
})
export class AdminLeftHeaderComponent {
  @Input() getLoggerEmail:string | undefined;
  @Input() getLoggerRole:string | undefined;
}
