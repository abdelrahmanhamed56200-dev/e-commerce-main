import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrderSummaryCardComponent } from './cart-order-summary-card.component';

describe('CartOrderSummaryCardComponent', () => {
  let component: CartOrderSummaryCardComponent;
  let fixture: ComponentFixture<CartOrderSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartOrderSummaryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartOrderSummaryCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
