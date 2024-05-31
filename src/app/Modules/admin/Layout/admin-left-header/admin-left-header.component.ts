import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-admin-left-header',
  templateUrl: './admin-left-header.component.html',
  styleUrls: ['./admin-left-header.component.css']
})
export class AdminLeftHeaderComponent {
  @Input() getLoggerEmail:string | undefined;
  @Input() getLoggerRole:string | undefined;


  constructor( @Inject(DOCUMENT) private document: Document){}
  
  sidebarToggler() {
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
