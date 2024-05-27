import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSubscriptionComponent } from './purchase-subscription.component';

describe('PurchaseSubscriptionComponent', () => {
  let component: PurchaseSubscriptionComponent;
  let fixture: ComponentFixture<PurchaseSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseSubscriptionComponent]
    });
    fixture = TestBed.createComponent(PurchaseSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
