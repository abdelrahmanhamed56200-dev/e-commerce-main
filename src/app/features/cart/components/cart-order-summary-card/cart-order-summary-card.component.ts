import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { title } from 'process';

@Component({
  selector: 'app-cart-order-summary-card',
  imports: [RouterLink, SweetAlert2Module],
  templateUrl: './cart-order-summary-card.component.html',
  styleUrl: './cart-order-summary-card.component.css',
})
export class CartOrderSummaryCardComponent {
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(MyToastrService);

  totalPrice = input.required<number>();
  numberOfItems = input.required<number>();

  isLogged = computed(() => this.authService.isLogged());

  freeShippingPercentage = signal(10);
  priceToFreeShipping = signal(0);

  constructor() {
    effect(() => {
      this.totalPrice();
      this.calcFreeShipping();
    });
  }

  calcFreeShipping() {
    this.priceToFreeShipping.set(550 - this.totalPrice());
    this.freeShippingPercentage.set(Math.round((this.totalPrice() / 550) * 100));
  }

  openPromoModal() {
    Swal.fire({
      html: `
        <div class="flex items-center gap-2 text-lg font-bold text-secondary-800 mb-2">
          <i class="fa-solid fa-tag text-primary-500"></i>
          Apply Promo Code
        </div>
        <div class="flex flex-col gap-2 text-left">
          <label class="text-sm font-semibold text-secondary-700"> Enter your code </label>

          <div
            class="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-primary-400 transition"
          >
            <i class="fa-solid fa-ticket text-secondary-400 text-sm mr-2"></i>

            <input
              id="promo-input"
              type="text"
              placeholder="e.g. FRESH20"
              class="flex-1 text-sm text-secondary-600 border-0 focus:ring-0 placeholder-gray-300 outline-none bg-transparent uppercase"
            />
          </div>

          <div id="promo-error" class="text-red-500 text-xs hidden">Please enter a promo code</div>
        </div>`,

      showCancelButton: true,
      confirmButtonText: 'Apply Code',
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      reverseButtons: true,

      customClass: {
        popup: 'rounded-3xl p-6',
        confirmButton:
          'bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition ms-3',
        cancelButton:
          'border border-gray-200 text-secondary-500 hover:border-gray-300 font-semibold py-2.5 px-6 rounded-xl text-sm transition',
        actions: 'w-full flex gap-3 mt-3',
      },

      didOpen: () => {
        const input = document.getElementById('promo-input') as HTMLInputElement;
        input?.focus();
      },

      preConfirm: () => {
        const input = document.getElementById('promo-input') as HTMLInputElement;
        const value = input?.value?.trim();

        const error = document.getElementById('promo-error');

        if (!value) {
          if (error) {
            error.classList.remove('hidden');
          }
          return false;
        }

        return value;
      },
    }).then((result) => {
      Swal.fire({
        icon: 'error',
        title: 'Invalid code',
        text: 'Please check the code and try again',
        confirmButtonText: 'OK',
        timer: 2500,
        timerProgressBar: true,
        customClass: {
          popup: 'rounded-2xl p-6',
          title: 'text-lg font-bold text-slate-800',
          htmlContainer: 'text-sm text-gray-500',
        },
      });
    });
  }
}
