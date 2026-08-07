import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOrderCardComponent } from './orders-order-card.component';

describe('OrdersOrderCardComponent', () => {
  let component: OrdersOrderCardComponent;
  let fixture: ComponentFixture<OrdersOrderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersOrderCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersOrderCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
