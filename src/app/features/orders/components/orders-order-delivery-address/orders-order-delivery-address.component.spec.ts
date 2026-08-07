import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOrderDeliveryAddressComponent } from './orders-order-delivery-address.component';

describe('OrdersOrderDeliveryAddressComponent', () => {
  let component: OrdersOrderDeliveryAddressComponent;
  let fixture: ComponentFixture<OrdersOrderDeliveryAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersOrderDeliveryAddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersOrderDeliveryAddressComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
