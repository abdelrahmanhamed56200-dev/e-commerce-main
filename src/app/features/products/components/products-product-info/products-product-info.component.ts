import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { CartApiService } from '../../../../core/services/cart/cart-api.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { WishlistApiService } from '../../../../core/services/wishList/wishlist-api.service';
import { WishlistService } from '../../../../core/services/wishList/wishlist.service';
import { DiscountPipe } from '../../../../shared/pipes/discount.pipe';
import { IAddRemoveWishlistItemRes } from '../../../wishlist/interfaces/add-remove-wishlist-item-res.interface';
import { IProductDetails } from '../../interfaces/product-details-response.interface';

@Component({
  selector: 'app-products-product-info',
  imports: [RouterLink, ReactiveFormsModule, DecimalPipe, DiscountPipe],
  templateUrl: './products-product-info.component.html',
  styleUrl: './products-product-info.component.css',
})
export class ProductsProductInfoComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly toastr = inject(MyToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly wishlistApiService = inject(WishlistApiService);
  private readonly cartApiService = inject(CartApiService);
  private readonly cartService = inject(CartService);

  productDetails = input.required<IProductDetails>();

  productQuantityInput: FormControl = this.fb.control([1]);
  totalPrice = signal(0);

  isLogged = computed(() => this.authService.isLogged());
  isAddedToWishlist = signal(false);
  isAddingToWishlist = signal(false);

  idAddingToCart = signal(false);
  isAddingToCartDone = signal(false);

  badges = [
    {
      icon: 'fa-solid fa-truck-fast',
      title: 'Free Delivery',
      text: 'Orders over $50',
    },
    {
      icon: 'fa-solid fa-rotate-left',
      title: '30 Days Return',
      text: 'Money back',
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Secure Payment',
      text: '100% Protected',
    },
  ];

  constructor() {
    effect(() => {
      this.setActiveWishlistProduct();
    });
  }
  ngOnInit(): void {
    this.updateTotalPrice();
  }
  setActiveWishlistProduct() {
    if (this.isLogged()) {
      if (this.wishlistService.wishlistProducts().length) {
        this.wishlistService.wishlistProducts().find((p) => p._id === this.productDetails()._id)
          ? this.isAddedToWishlist.set(true)
          : this.isAddedToWishlist.set(false);
      }
    } else if (isPlatformBrowser(this.pLATFORM_ID) && !this.isLogged()) {
      this.localStorageService
        .getAllWishlistProducts()
        .find((p) => p._id === this.productDetails()._id)
        ? this.isAddedToWishlist.set(true)
        : this.isAddedToWishlist.set(false);
    }
  }
  onAddProductToWishlist() {
    if (this.isAddingToWishlist()) return;
    this.isAddingToWishlist.set(true);

    if (this.isLogged()) {
      this.subToggleWishlist();
    } else if (isPlatformBrowser(this.pLATFORM_ID) && !this.isLogged()) {
      this.localStorageService.toggleProductToWishlist(this.productDetails());
      this.isAddingToWishlist.set(false);
      this.isAddedToWishlist.set(!this.isAddedToWishlist());
      this.wishlistService.upDateWishlistCounter();
    }
  }
  subToggleWishlist() {
    let obj = {
      next: (res: IAddRemoveWishlistItemRes) => {
        res.data.find((id) => id === this.productDetails()._id)
          ? this.isAddedToWishlist.set(true)
          : this.isAddedToWishlist.set(false);
        this.isAddingToWishlist.set(false);
        this.wishlistService.upDateWishlistCounter();
      },
      error: () => {
        this.isAddingToWishlist.set(false);
      },
    };
    if (this.isAddedToWishlist()) {
      this.wishlistApiService.removeProductToWishlist(this.productDetails()._id).subscribe(obj);
    } else {
      this.wishlistApiService.addProductToWishlist(this.productDetails()._id).subscribe(obj);
    }
  }
  onAddProductToCart() {
    if (this.idAddingToCart() || this.isAddingToCartDone() || !this.isValidQuantityToAddToCart())
      return;
    this.idAddingToCart.set(true);

    if (this.isLogged()) {
      this.subAddProductToCart();
    } else if (isPlatformBrowser(this.pLATFORM_ID) && !this.isLogged()) {
      this.localStorageService.addProductToCart(
        this.productDetails(),
        this.productQuantityInput.value,
      );
      this.idAddingToCart.set(false);
      this.addingToCartDone();
      this.productQuantityInput.setValue(1);
      this.updateTotalPrice();
      this.cartService.upDateCart();
    }
  }
  subAddProductToCart() {
    const errFn = (err: HttpErrorResponse) => {
      this.productQuantityInput.setValue(1);
      this.idAddingToCart.set(false);
      this.cartService.upDateCart();
      this.toastr.error('Failed to add product to cart!');
      this.updateTotalPrice();
    };

    this.cartApiService.addProductToCart_v2(this.productDetails()._id).subscribe({
      next: () => {
        if (this.productQuantityInput.value > 1) {
          this.cartApiService
            .updateProductCartQuantity_v2(
              this.productDetails()._id,
              this.productQuantityInput.value,
            )
            .subscribe({
              next: () => {
                this.productQuantityInput.setValue(1);
                this.cartService.upDateCart();
                this.addingToCartDone();
                this.idAddingToCart.set(false);
                this.updateTotalPrice();
              },
              error: errFn,
            });
        } else {
          this.productQuantityInput.setValue(1);
          this.cartService.upDateCart();
          this.addingToCartDone();
          this.idAddingToCart.set(false);
          this.updateTotalPrice();
        }
      },
      error: errFn,
    });
  }
  addingToCartDone() {
    if (this.isAddingToCartDone()) return;
    this.isAddingToCartDone.set(true);
    setTimeout(() => {
      this.isAddingToCartDone.set(false);
    }, 1000);
  }
  updateTotalPrice() {
    if (this.productDetails().priceAfterDiscount)
      this.totalPrice.set(
        +this.productQuantityInput.value * this.productDetails().priceAfterDiscount!,
      );
    else this.totalPrice.set(+this.productQuantityInput.value * this.productDetails().price);
  }
  isValidQuantityToAddToCart(): boolean {
    if (this.productQuantityInput.value === 0) {
      this.toastr.error('Quantity must be at least 1');
      return false;
    }
    return true;
  }
  onSetProductQuantity(quantity: number, state: 'replace' | 'add') {
    if (state === 'add') {
      if (this.productQuantityInput.value + quantity < 0) {
        this.productQuantityInput.setValue(0);
      } else if (this.productQuantityInput.value + quantity > this.productDetails().quantity) {
        this.productQuantityInput.setValue(this.productDetails().quantity);
      } else {
        this.productQuantityInput.setValue(+this.productQuantityInput.value + quantity);
      }
    } else if (state === 'replace') {
      if (quantity < 0) {
        this.productQuantityInput.setValue(0);
      } else if (quantity > this.productDetails().quantity) {
        this.productQuantityInput.setValue(this.productDetails().quantity);
      } else {
        this.productQuantityInput.setValue(quantity);
      }
    }
    this.updateTotalPrice();
  }
}
