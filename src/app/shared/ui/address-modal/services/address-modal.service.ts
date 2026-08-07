import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddressModalService {
  isOpen = signal(false);
  isVisible = signal(false);

  moduleType = signal<'edit' | 'add'>('add');
  data = signal<{
    _id?: string;
    name: string;
    details: string;
    phone: string;
    city: string;
  }>({
    _id: '',
    name: '',
    details: '',
    phone: '',
    city: '',
  });

  openAddressModal(
    moduleType: 'edit' | 'add',
    data?: {
      _id?: string;
      name: string;
      details: string;
      phone: string;
      city: string;
    },
  ) {
    this.isVisible.set(true);
    setTimeout(() => {
      this.isOpen.set(true);
    }, 800);

    this.moduleType.set(moduleType);
    this.isOpen.set(true);
    if (data) this.data.set(data);
  }

  closeAddressModal() {
    this.isOpen.set(false);
    setTimeout(() => {
      this.isVisible.set(false);
    }, 200);

    this.isOpen.set(false);
  }
}
