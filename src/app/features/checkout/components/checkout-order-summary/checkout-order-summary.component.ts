import { Component, input, output } from '@angular/core';
import { OrderItemComponent } from '../../../../shared/ui/order-item/order-item.component';
import { ICartRes } from '../../../cart/interfaces/cart-res.interface';

@Component({
  selector: 'app-checkout-order-summary',
  imports: [OrderItemComponent],
  templateUrl: './checkout-order-summary.component.html',
  styleUrl: './checkout-order-summary.component.css',
})
export class CheckoutOrderSummaryComponent {
  paymentType = input.required<'cash' | 'card'>();
  cartRes = input.required<ICartRes>();
  isLoading = input.required<boolean>();
  onCheckout = output();

  checkout() {
    this.onCheckout.emit();
  }
}
