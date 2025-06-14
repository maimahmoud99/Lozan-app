import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPaymentOrderComponent } from './waiting-payment-order.component';

describe('WaitingPaymentOrderComponent', () => {
  let component: WaitingPaymentOrderComponent;
  let fixture: ComponentFixture<WaitingPaymentOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingPaymentOrderComponent]
    });
    fixture = TestBed.createComponent(WaitingPaymentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
