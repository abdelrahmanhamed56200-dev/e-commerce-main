import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAllOrdersComponent } from './orders-all-orders.component';

describe('OrdersAllOrdersComponent', () => {
  let component: OrdersAllOrdersComponent;
  let fixture: ComponentFixture<OrdersAllOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersAllOrdersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersAllOrdersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
