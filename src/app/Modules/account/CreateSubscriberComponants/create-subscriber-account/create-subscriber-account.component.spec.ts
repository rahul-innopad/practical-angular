import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscriberAccountComponent } from './create-subscriber-account.component';

describe('CreateSubscriberAccountComponent', () => {
  let component: CreateSubscriberAccountComponent;
  let fixture: ComponentFixture<CreateSubscriberAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubscriberAccountComponent]
    });
    fixture = TestBed.createComponent(CreateSubscriberAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
