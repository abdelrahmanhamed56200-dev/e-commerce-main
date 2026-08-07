import { Component, computed, effect, HostListener, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AddressModalInputComponent } from './components/address-modal-input/address-modal-input.component';
import { AddressModalService } from './services/address-modal.service';
import { MyToastrService } from '../../../core/services/toastr/my-toastr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileAddressesService } from '../../../features/profile/services/profile-addresses.service';
import { AddressApiService } from '../../../core/services/address/address-api.service';

@Component({
  selector: 'app-address-modal',
  imports: [ReactiveFormsModule, AddressModalInputComponent],
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.css',
})
export class AddressModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly addressModalService = inject(AddressModalService);
  private readonly toastrService = inject(MyToastrService);
  private readonly addressApiService = inject(AddressApiService);
  private readonly profileAddressesService = inject(ProfileAddressesService);

  isOpen = computed(() => this.addressModalService.isOpen());
  isVisible = computed(() => this.addressModalService.isVisible());

  data = computed(() => this.addressModalService.data());
  isLoading = signal(false);
  moduleType = computed<'edit' | 'add'>(() => this.addressModalService.moduleType());

  addressForm = this.fb.group(
    {
      name: [
        '',
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 2 }),
          RxwebValidators.pattern({
            expression: {
              validName: /^\s*[A-Za-z]+(?:[\s-][A-Za-z]+)*\s*$/,
            },
          }),
        ],
      ],
      details: [
        '',
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 10 }),
          RxwebValidators.maxLength({ value: 200 }),
        ],
      ],
      city: [
        '',
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 2 }),
          RxwebValidators.maxLength({ value: 50 }),
          RxwebValidators.pattern({
            expression: {
              validCity: /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/,
            },
          }),
        ],
      ],
      phone: [
        '',
        [
          RxwebValidators.required(),
          RxwebValidators.pattern({
            expression: {
              egyptPhone: /^(?:\+20|0020|0)?1[0125][0-9]{8}$/,
            },
          }),
        ],
      ],
    },
    { nullable: false },
  );

  constructor() {
    effect(() => {
      this.addressModalService.isOpen();
      this.onOpen();
    });
  }
  onOpen() {
    if (this.isLoading()) return;
    if (this.moduleType() === 'edit') {
      this.addressForm.patchValue(this.data());
    } else {
      this.addressForm.reset();
    }
  }
  @HostListener('window:resize')
  @HostListener('document:keydown.escape')
  onClose() {
    if (this.isLoading()) return;
    this.addressModalService.closeAddressModal();
  }

  onSubmit() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.invalid) return;

    if (this.isLoading()) return;
    this.isLoading.set(true);

    if (this.moduleType() === 'add') {
      this.addNewAddress();
    } else {
      this.updateAddress();
    }
  }

  addNewAddress() {
    this.addressApiService.addAddress(this.addressForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.addressModalService.closeAddressModal();
        this.profileAddressesService.upDateAddress();
        this.toastrService.success(res.message);
      },
      error: (err) => this.errorResponse(err),
    });
  }

  updateAddress() {
    this.addressApiService.removeAddress(this.data()._id!).subscribe({
      next: (res) => {
        this.addressApiService.addAddress(this.addressForm.value).subscribe({
          next: (res) => {
            this.toastrService.success(res.message);
            this.addressModalService.closeAddressModal();
            this.isLoading.set(false);
            this.profileAddressesService.upDateAddress();
          },
          error: (err) => this.errorResponse(err),
        });
      },
      error: (err) => this.errorResponse(err),
    });
  }

  errorResponse(err: HttpErrorResponse) {
    this.toastrService.error(err.error?.message || 'Something went wrong');
    this.addressModalService.closeAddressModal();
    this.isLoading.set(false);
    this.profileAddressesService.upDateAddress();
  }
}
