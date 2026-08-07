import { Component, computed, inject, OnInit } from '@angular/core';
import { AddressCardSkeletonComponent } from '../../../../shared/ui/address-card-skeleton/address-card-skeleton.component';
import { AddressModalService } from '../../../../shared/ui/address-modal/services/address-modal.service';
import { NotFoundProducesComponent } from '../../../../shared/ui/not-found-produces/not-found-produces.component';
import { ProfileAddressesAllAddressesListComponent } from '../../components/profile-addresses-all-addresses-list/profile-addresses-all-addresses-list.component';
import { ProfileAddressesHeaderComponent } from '../../components/profile-addresses-header/profile-addresses-header.component';
import { ProfileAddressesService } from '../../services/profile-addresses.service';

@Component({
  selector: 'app-profile-addresses-page',
  imports: [
    NotFoundProducesComponent,
    ProfileAddressesHeaderComponent,
    ProfileAddressesAllAddressesListComponent,
    AddressCardSkeletonComponent,
  ],
  templateUrl: './profile-addresses-page.component.html',
  styleUrl: './profile-addresses-page.component.css',
})
export class ProfileAddressesPageComponent implements OnInit {
  private readonly profileAddressesService = inject(ProfileAddressesService);
  private readonly addressModalService = inject(AddressModalService);

  allAddresses = computed(() => this.profileAddressesService.allAddresses());
  isLoading = computed(() => this.profileAddressesService.isLoading());

  ngOnInit(): void {
    this.profileAddressesService.getAllAddresses();
  }

  addAddress() {
    this.addressModalService.openAddressModal('add');
  }
}
