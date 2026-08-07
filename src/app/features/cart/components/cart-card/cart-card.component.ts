import { ViewportScroller } from '@angular/common';
import { Component, computed, inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { CartApiService } from '../../../../core/services/cart/cart-api.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { IProductCart } from '../../interfaces/cart-res.interface';
@Component({
  selector: 'app-cart-card',
  imports: [RouterLink, SweetAlert2Module, ReactiveFormsModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css',
})
export class CartCardComponent implements OnInit {
  private readonly platform = inject(PLATFORM_ID);
  private readonly cartService = inject(CartService);
  private readonly cartApiService = inject(CartApiService);
  private readonly authService = inject(AuthService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly toastr = inject(MyToastrService);
  private readonly fb = inject(FormBuilder);

  quantityInput: FormControl = this.fb.control([0]);

  product = input.required<IProductCart>();
  total = computed(() => this.product().count * this.product().price);
  isLoading = signal(false);
  isLogged = computed(() => this.authService.isLogged());
  oldQuantity = computed(() => this.product().count);

  ngOnInit(): void {
    this.quantityInput.setValue(this.product().count);

    this.quantityInput.valueChanges.subscribe((value) => {
      if (value < 1) {
        this.quantityInput.setValue(1);
        return;
      } else if (value > this.product().product.quantity) {
        this.quantityInput.setValue(this.product().product.quantity);
        return;
      } else if (value !== this.oldQuantity()) {
        this.onSetNewQuantity();
      }
    });
  }

  onSetNewQuantity() {
    if (this.isLoading()) return;
    this.isLoading.set(true);

    if (this.isLogged()) {
      this.cartApiService
        .updateProductCartQuantity_v2(this.product().product._id, this.quantityInput.value)
        .subscribe({
          next: () => {
            this.cartService.upDateCart();
            this.isLoading.set(false);
          },
          error: () => {
            this.quantityInput.setValue(this.oldQuantity());
            this.isLoading.set(false);
            this.toastr.error('Something went wrong');
          },
        });
    } else {
      this.localStorageService.setNewQuantityProductCart(
        this.product().product,
        this.quantityInput.value,
      );
      this.cartService.upDateCart();
      this.isLoading.set(false);
    }
  }

  onAddValue(num: number) {
    if (this.isLoading()) return;
    this.quantityInput.setValue(this.quantityInput.value + num);
  }

  onRemove() {
    if (this.isLoading()) return;
    this.isLoading.set(true);

    if (this.isLogged()) {
      this.cartApiService.removeProductFromCart_v2(this.product().product._id).subscribe({
        next: () => {
          this.cartService.upDateCart();
          this.isLoading.set(false);
          this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
        },
        error: () => {
          this.cartService.upDateCart();
          this.isLoading.set(false);
          this.toastr.error('Something went wrong');
        },
      });
    } else {
      this.localStorageService.removeProductCart(this.product().product);
      this.cartService.upDateCart();
      this.isLoading.set(false);
      this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
    }
  }
  successSwal() {
    Swal.fire({
      title: ' Product removed!',
      text: 'Product removed from your cart.',
      confirmButtonText: 'Continue Shopping',
      icon: 'success',
      timer: 1300,
      timerProgressBar: true,
    });
  }
}
