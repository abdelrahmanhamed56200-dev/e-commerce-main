import { Component, input, output } from '@angular/core';
import { IAddress } from '../../../../core/models/addresses-response.interface';

@Component({
  selector: 'app-checkout-saved-address-button',
  imports: [],
  templateUrl: './checkout-saved-address-button.component.html',
  styleUrl: './checkout-saved-address-button.component.css',
})
export class CheckoutSavedAddressButtonComponent {
  address = input.required<IAddress>();
  activeId = input.required<string | null>();
  onClick = output<IAddress>();

  click() {
    this.onClick.emit(this.address());
  }
}
