import { Component, inject, input, output } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { IAddress } from '../../../core/models/addresses-response.interface';
import { MyToastrService } from '../../../core/services/toastr/my-toastr.service';
import { AddressModalService } from '../address-modal/services/address-modal.service';
import { ProfileAddressesService } from '../../../features/profile/services/profile-addresses.service';
import { AddressApiService } from '../../../core/services/address/address-api.service';

@Component({
  selector: 'app-address-card',
  imports: [SweetAlert2Module],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.css',
})
export class AddressCardComponent {
  private readonly addressApiService = inject(AddressApiService);
  private readonly toastrService = inject(MyToastrService);
  private readonly addressModalService = inject(AddressModalService);
  private readonly profileAddressesService = inject(ProfileAddressesService);

  address = input.required<IAddress>();

  onDelete() {
    Swal.fire({
      title: 'Are you sure you want to delete this address?',
      text: " You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-primary-500)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) this.deleteAddress();
    });
  }
  deleteAddress() {
    this.addressApiService.removeAddress(this.address()._id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
        this.profileAddressesService.upDateAddress();
      },
      error: (err) => {
        this.toastrService.error(err.error?.message || 'Something went wrong');
        this.profileAddressesService.upDateAddress();
      },
    });
  }

  onEdit() {
    this.addressModalService.openAddressModal('edit', this.address());
  }
}
