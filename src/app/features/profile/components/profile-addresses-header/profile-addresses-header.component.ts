import { Component, output } from '@angular/core';

@Component({
  selector: 'app-profile-addresses-header',
  imports: [],
  templateUrl: './profile-addresses-header.component.html',
  styleUrl: './profile-addresses-header.component.css',
})
export class ProfileAddressesHeaderComponent {
  onAddAddress = output();

  addAddress() {
    this.onAddAddress.emit();
  }
}
