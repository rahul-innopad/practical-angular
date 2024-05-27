import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRightHeaderComponent } from './admin-right-header.component';

describe('AdminRightHeaderComponent', () => {
  let component: AdminRightHeaderComponent;
  let fixture: ComponentFixture<AdminRightHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRightHeaderComponent]
    });
    fixture = TestBed.createComponent(AdminRightHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
