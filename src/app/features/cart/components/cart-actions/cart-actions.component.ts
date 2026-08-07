import { ViewportScroller } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { CartApiService } from '../../../../core/services/cart/cart-api.service';

@Component({
  selector: 'app-cart-actions',
  imports: [SweetAlert2Module],
  templateUrl: './cart-actions.component.html',
  styleUrl: './cart-actions.component.css',
})
export class CartActionsComponent {
  private readonly cartService = inject(CartService);
  private readonly cartApiService = inject(CartApiService);
  private readonly authService = inject(AuthService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly toastr = inject(MyToastrService);

  isLoading = signal(false);
  isLogged = computed(() => this.authService.isLogged());

  onRemove() {
    if (this.isLoading()) return;
    this.isLoading.set(true);

    if (this.isLogged()) {
      this.cartApiService.clearCart_v2().subscribe({
        next: () => {
          this.cartService.upDateCart();
          this.isLoading.set(false);
          this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
          this.successSwal();
        },
        error: () => {
          this.cartService.upDateCart();
          this.isLoading.set(false);
          this.toastr.error('Something went wrong');
        },
      });
    } else {
      this.localStorageService.removeAllCartProducts();
      this.cartService.upDateCart();
      this.isLoading.set(false);
      this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
      this.successSwal();
    }
  }

  successSwal() {
    Swal.fire({
      title: ' Cart Cleared!',
      text: 'Your cart is now empty.',
      confirmButtonText: 'Continue Shopping',
      icon: 'success',
      timer: 1500,
      timerProgressBar: true,
    });
  }

  onFireSwal() {
    Swal.fire({
      html: `
              <div class='text-center'>
                <div class='w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-red-100 mb-3'>
                  <i class='fa-solid fa-cart-shopping text-red-500 text-xl'></i>
                </div>
                
                <h2 class='text-lg font-semibold text-gray-900 mb-2'>
                  Clear Your Cart?
                </h2>
              
                <p class='text-gray-600'>
                  All items will be removed from your cart. This action cannot be undone.                
                </p>
              </div>`,
      showCancelButton: true,
      confirmButtonText: 'Yes, Clear All',
      cancelButtonText: 'Keep Shopping',
      buttonsStyling: false,
      reverseButtons: true,
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl ms-4',
        cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.onRemove();
      }
    });
  }
}
