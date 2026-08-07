import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSavedAddressButtonComponent } from './checkout-saved-address-button.component';

describe('CheckoutSavedAddressButtonComponent', () => {
  let component: CheckoutSavedAddressButtonComponent;
  let fixture: ComponentFixture<CheckoutSavedAddressButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutSavedAddressButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutSavedAddressButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
