import { Component, input } from '@angular/core';
import { CartItem, IOrder } from '../../interfaces/orders-response.interface';
import { ICartRes } from '../../../cart/interfaces/cart-res.interface';
import { OrderItemComponent } from '../../../../shared/ui/order-item/order-item.component';

@Component({
  selector: 'app-orders-order-items',
  imports: [OrderItemComponent],
  templateUrl: './orders-order-items.component.html',
  styleUrl: './orders-order-items.component.css',
})
export class OrdersOrderItemsComponent {
  cartItems = input.required<CartItem[]>();
}
