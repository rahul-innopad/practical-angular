import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlstComponent } from './userlst.component';

describe('UserlstComponent', () => {
  let component: UserlstComponent;
  let fixture: ComponentFixture<UserlstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserlstComponent]
    });
    fixture = TestBed.createComponent(UserlstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
