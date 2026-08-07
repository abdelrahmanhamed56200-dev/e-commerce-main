import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutUseDifferentAddressButtonComponent } from './checkout-use-different-address-button.component';

describe('CheckoutUseDifferentAddressButtonComponent', () => {
  let component: CheckoutUseDifferentAddressButtonComponent;
  let fixture: ComponentFixture<CheckoutUseDifferentAddressButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutUseDifferentAddressButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutUseDifferentAddressButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
