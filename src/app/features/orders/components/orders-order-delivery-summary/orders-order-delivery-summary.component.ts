import { Component, input } from '@angular/core';

@Component({
  selector: 'app-orders-order-delivery-summary',
  imports: [],
  templateUrl: './orders-order-delivery-summary.component.html',
  styleUrl: './orders-order-delivery-summary.component.css',
})
export class OrdersOrderDeliverySummaryComponent {
  shippingPrice = input<number>(0);
  taxPrice = input<number>(0);
  totalOrderPrice = input.required<number>();
  paymentMethodType = input.required<'cash' | 'card'>();
}
