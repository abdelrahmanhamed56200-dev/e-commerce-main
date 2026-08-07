import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { IOrder } from '../../interfaces/orders-response.interface';

@Component({
  selector: 'app-orders-order-header',
  imports: [DatePipe],
  templateUrl: './orders-order-header.component.html',
  styleUrl: './orders-order-header.component.css',
})
export class OrdersOrderHeaderComponent {
  order = input.required<IOrder>();
}
