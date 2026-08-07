import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-orders-order-price-toggle',
  imports: [],
  templateUrl: './orders-order-price-toggle.component.html',
  styleUrl: './orders-order-price-toggle.component.css',
})
export class OrdersOrderPriceToggleComponent {
  totalPrice = input.required<number>();
  onToggle = output<boolean>();

  isOpen = signal<boolean>(false);

  onClick() {
    this.isOpen.set(!this.isOpen());
    this.onToggle.emit(this.isOpen());
  }
}
