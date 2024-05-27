import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityLstComponent } from './city-lst.component';

describe('CityLstComponent', () => {
  let component: CityLstComponent;
  let fixture: ComponentFixture<CityLstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityLstComponent]
    });
    fixture = TestBed.createComponent(CityLstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
