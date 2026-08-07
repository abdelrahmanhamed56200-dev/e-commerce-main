import { Component, input, signal } from '@angular/core';
import { OrdersOrderHeaderComponent } from '../orders-order-header/orders-order-header.component';
import { OrdersOrderPriceToggleComponent } from '../orders-order-price-toggle/orders-order-price-toggle.component';
import { OrdersOrderItemsComponent } from '../orders-order-items/orders-order-items.component';
import { OrdersOrderDeliveryAddressComponent } from '../orders-order-delivery-address/orders-order-delivery-address.component';
import { OrdersOrderDeliverySummaryComponent } from '../orders-order-delivery-summary/orders-order-delivery-summary.component';
import { IOrder } from '../../interfaces/orders-response.interface';

@Component({
  selector: 'app-orders-order-card',
  imports: [
    OrdersOrderHeaderComponent,
    OrdersOrderPriceToggleComponent,
    OrdersOrderItemsComponent,
    OrdersOrderDeliveryAddressComponent,
    OrdersOrderDeliverySummaryComponent,
  ],
  templateUrl: './orders-order-card.component.html',
  styleUrl: './orders-order-card.component.css',
})
export class OrdersOrderCardComponent {
  order = input.required<IOrder>();
  isOpen = signal<boolean>(false);

  onToggle(value: boolean) {
    this.isOpen.set(value);
  }
}
