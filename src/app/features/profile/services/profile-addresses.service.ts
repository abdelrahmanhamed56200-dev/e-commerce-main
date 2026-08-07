import { inject, Injectable, signal } from '@angular/core';
import { IAddress } from '../../../core/models/addresses-response.interface';
import { AddressApiService } from '../../../core/services/address/address-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileAddressesService {
  private readonly addressApiService = inject(AddressApiService);

  allAddresses = signal<IAddress[]>([]);
  isLoading = signal(false);

  getAllAddresses() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.addressApiService.getLoggedUserAddresses().subscribe({
      next: (res) => {
        this.allAddresses.set(res.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  upDateAddress() {
    this.getAllAddresses();
    this.isLoading.set(false);
  }
}
