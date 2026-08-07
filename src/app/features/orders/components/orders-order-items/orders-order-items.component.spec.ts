import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOrderItemsComponent } from './orders-order-items.component';

describe('OrdersOrderItemsComponent', () => {
  let component: OrdersOrderItemsComponent;
  let fixture: ComponentFixture<OrdersOrderItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersOrderItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersOrderItemsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
