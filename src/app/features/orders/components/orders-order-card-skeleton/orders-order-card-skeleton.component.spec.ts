import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOrderCardSkeletonComponent } from './orders-order-card-skeleton.component';

describe('OrdersOrderCardSkeletonComponent', () => {
  let component: OrdersOrderCardSkeletonComponent;
  let fixture: ComponentFixture<OrdersOrderCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersOrderCardSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersOrderCardSkeletonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
