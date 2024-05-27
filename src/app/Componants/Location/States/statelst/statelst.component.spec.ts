import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatelstComponent } from './statelst.component';

describe('StatelstComponent', () => {
  let component: StatelstComponent;
  let fixture: ComponentFixture<StatelstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatelstComponent]
    });
    fixture = TestBed.createComponent(StatelstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
