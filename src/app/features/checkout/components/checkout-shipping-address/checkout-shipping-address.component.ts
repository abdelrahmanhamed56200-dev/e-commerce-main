import { Component, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IAddress } from '../../../../core/models/addresses-response.interface';
import { CheckoutSavedAddressButtonComponent } from '../checkout-saved-address-button/checkout-saved-address-button.component';
import { CheckoutUseDifferentAddressButtonComponent } from '../checkout-use-different-address-button/checkout-use-different-address-button.component';

@Component({
  selector: 'app-checkout-shipping-address',
  imports: [
    ReactiveFormsModule,
    CheckoutSavedAddressButtonComponent,
    CheckoutUseDifferentAddressButtonComponent,
  ],
  templateUrl: './checkout-shipping-address.component.html',
  styleUrl: './checkout-shipping-address.component.css',
})
export class CheckoutShippingAddressComponent {
  userAddresses = input.required<IAddress[]>();
  addressForm = input.required<
    FormGroup<{
      city: FormControl<string>;
      details: FormControl<string>;
      phone: FormControl<string>;
    } | null>
  >();

  activeId = signal<string | null>(null);
  activeAddress = signal<IAddress | null>(null);

  setAddressToForm(address: IAddress | null) {
    this.activeAddress.set(address);
    this.activeId.set(this.activeAddress()?._id ?? null);
    this.addressForm().reset(this.activeAddress());
  }
}
