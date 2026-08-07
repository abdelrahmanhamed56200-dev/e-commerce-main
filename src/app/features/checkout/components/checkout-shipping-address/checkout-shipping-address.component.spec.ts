import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutShippingAddressComponent } from './checkout-shipping-address.component';

describe('CheckoutShippingAddressComponent', () => {
  let component: CheckoutShippingAddressComponent;
  let fixture: ComponentFixture<CheckoutShippingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutShippingAddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutShippingAddressComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
