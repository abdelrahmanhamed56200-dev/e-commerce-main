import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPaymentMethodComponent } from './checkout-payment-method.component';

describe('CheckoutPaymentMethodComponent', () => {
  let component: CheckoutPaymentMethodComponent;
  let fixture: ComponentFixture<CheckoutPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutPaymentMethodComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutPaymentMethodComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
