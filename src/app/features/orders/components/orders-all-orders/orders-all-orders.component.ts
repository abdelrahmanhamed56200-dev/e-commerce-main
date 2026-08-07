import { Component, input } from '@angular/core';
import { OrdersOrderCardComponent } from '../orders-order-card/orders-order-card.component';
import { IOrder } from '../../interfaces/orders-response.interface';

@Component({
  selector: 'app-orders-all-orders',
  imports: [OrdersOrderCardComponent],
  templateUrl: './orders-all-orders.component.html',
  styleUrl: './orders-all-orders.component.css',
})
export class OrdersAllOrdersComponent {
  orders = input.required<IOrder[]>();
}
