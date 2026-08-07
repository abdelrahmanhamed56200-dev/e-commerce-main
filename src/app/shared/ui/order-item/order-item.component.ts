import { Component, input } from '@angular/core';
import { CartItem } from '../../../features/orders/interfaces/orders-response.interface';

@Component({
  selector: 'app-order-item',
  imports: [],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
})
export class OrderItemComponent {
  cartItem = input.required<CartItem>();
}
