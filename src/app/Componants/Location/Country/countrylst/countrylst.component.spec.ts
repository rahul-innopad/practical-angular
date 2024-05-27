import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrylstComponent } from './countrylst.component';

describe('CountrylstComponent', () => {
  let component: CountrylstComponent;
  let fixture: ComponentFixture<CountrylstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountrylstComponent]
    });
    fixture = TestBed.createComponent(CountrylstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
