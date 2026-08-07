import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkout-use-different-address-button',
  imports: [],
  templateUrl: './checkout-use-different-address-button.component.html',
  styleUrl: './checkout-use-different-address-button.component.css',
})
export class CheckoutUseDifferentAddressButtonComponent {
  activeId = input.required<string | null>();
  onClick = output<null>();

  click() {
    this.onClick.emit(null);
  }
}
