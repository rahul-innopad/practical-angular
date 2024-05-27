import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRightSideComponent } from './header-right-side.component';

describe('HeaderRightSideComponent', () => {
  let component: HeaderRightSideComponent;
  let fixture: ComponentFixture<HeaderRightSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderRightSideComponent]
    });
    fixture = TestBed.createComponent(HeaderRightSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
