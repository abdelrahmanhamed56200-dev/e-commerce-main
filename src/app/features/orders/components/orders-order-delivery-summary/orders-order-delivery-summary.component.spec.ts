import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOrderDeliverySummaryComponent } from './orders-order-delivery-summary.component';

describe('OrdersOrderDeliverySummaryComponent', () => {
  let component: OrdersOrderDeliverySummaryComponent;
  let fixture: ComponentFixture<OrdersOrderDeliverySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersOrderDeliverySummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersOrderDeliverySummaryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
