import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOrderHeaderComponent } from './orders-order-header.component';

describe('OrdersOrderHeaderComponent', () => {
  let component: OrdersOrderHeaderComponent;
  let fixture: ComponentFixture<OrdersOrderHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersOrderHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersOrderHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
