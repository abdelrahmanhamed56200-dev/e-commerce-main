import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOrderPriceToggleComponent } from './orders-order-price-toggle.component';

describe('OrdersOrderPriceToggleComponent', () => {
  let component: OrdersOrderPriceToggleComponent;
  let fixture: ComponentFixture<OrdersOrderPriceToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersOrderPriceToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersOrderPriceToggleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
