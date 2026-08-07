import { Component, input } from '@angular/core';
import { ShippingAddress } from '../../interfaces/orders-response.interface';

@Component({
  selector: 'app-orders-order-delivery-address',
  imports: [],
  templateUrl: './orders-order-delivery-address.component.html',
  styleUrl: './orders-order-delivery-address.component.css',
})
export class OrdersOrderDeliveryAddressComponent {
  shippingAddress = input<ShippingAddress>();
}
