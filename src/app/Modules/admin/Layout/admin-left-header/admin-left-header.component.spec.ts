import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeftHeaderComponent } from './admin-left-header.component';

describe('AdminLeftHeaderComponent', () => {
  let component: AdminLeftHeaderComponent;
  let fixture: ComponentFixture<AdminLeftHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLeftHeaderComponent]
    });
    fixture = TestBed.createComponent(AdminLeftHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
