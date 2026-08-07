import { Component, input, output } from '@angular/core';
import { IAddress } from '../../../../core/models/addresses-response.interface';
import { AddressCardComponent } from '../../../../shared/ui/address-card/address-card.component';

@Component({
  selector: 'app-profile-addresses-all-addresses-list',
  imports: [AddressCardComponent],
  templateUrl: './profile-addresses-all-addresses-list.component.html',
  styleUrl: './profile-addresses-all-addresses-list.component.css',
})
export class ProfileAddressesAllAddressesListComponent {
  allAddresses = input.required<IAddress[]>();
}
