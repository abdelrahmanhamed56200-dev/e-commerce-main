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
import { IProduct } from '../../../core/models/product.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DiscountPipe } from '../../pipes/discount.pipe';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LocalStorageService } from '../../../core/services/localStorage/local-storage.service';
import { WishlistService } from '../../../core/services/wishList/wishlist.service';
import { IAddRemoveWishlistItemRes } from '../../../features/wishlist/interfaces/add-remove-wishlist-item-res.interface';
import { CartService } from '../../../core/services/cart/cart.service';
import { MyToastrService } from '../../../core/services/toastr/my-toastr.service';
import { WishlistApiService } from '../../../core/services/wishList/wishlist-api.service';
import { CartApiService } from '../../../core/services/cart/cart-api.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink, DiscountPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private readonly authService = inject(AuthService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly wishlistService = inject(WishlistService);
  private readonly wishlistApiService = inject(WishlistApiService);
  private readonly cartService = inject(CartService);
  private readonly cartApiService = inject(CartApiService);
  private readonly toastr = inject(MyToastrService);

  isLogged = computed(() => this.authService.isLogged());
  product = input.required<IProduct>();
  isAddedToWishlist = signal(false);
  isAddingToWishlist = signal(false);

  idAddingToCart = signal(false);
  isAddingToCartDone = signal(false);

  constructor() {
    effect(() => {
      this.setActiveWishlistProduct();
    });
  }

  setActiveWishlistProduct() {
    if (this.isLogged()) {
      if (this.wishlistService.wishlistProducts().length) {
        this.wishlistService.wishlistProducts().find((p) => p._id === this.product()._id)
          ? this.isAddedToWishlist.set(true)
          : this.isAddedToWishlist.set(false);
      }
    } else if (isPlatformBrowser(this.pLATFORM_ID) && !this.isLogged()) {
      this.localStorageService.getAllWishlistProducts().find((p) => p._id === this.product()._id)
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
      this.localStorageService.toggleProductToWishlist(this.product());
      this.isAddingToWishlist.set(false);
      this.isAddedToWishlist.set(!this.isAddedToWishlist());
      this.wishlistService.upDateWishlistCounter();
    }
  }
  subToggleWishlist() {
    let obj = {
      next: (res: IAddRemoveWishlistItemRes) => {
        res.data.find((id) => id === this.product()._id)
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
      this.wishlistApiService.removeProductToWishlist(this.product()._id).subscribe(obj);
    } else {
      this.wishlistApiService.addProductToWishlist(this.product()._id).subscribe(obj);
    }
  }

  onAddProductToCart() {
    if (this.idAddingToCart() || this.isAddingToCartDone()) return;
    this.idAddingToCart.set(true);

    if (this.isLogged()) {
      this.subAddProductToCart();
    } else if (isPlatformBrowser(this.pLATFORM_ID) && !this.isLogged()) {
      this.localStorageService.addProductToCart(this.product(), 1);
      this.cartService.upDateCart();
      this.idAddingToCart.set(false);
      this.addingToCartDone();
    }
  }
  subAddProductToCart() {
    this.cartApiService.addProductToCart_v2(this.product()._id).subscribe({
      next: () => {
        this.idAddingToCart.set(false);
        this.addingToCartDone();
        this.cartService.upDateCart();
      },
      error: () => {
        this.idAddingToCart.set(false);
        this.cartService.upDateCart();
        this.toastr.error('Failed to add product to cart!');
      },
    });
  }
  addingToCartDone() {
    if (this.isAddingToCartDone()) return;
    this.isAddingToCartDone.set(true);
    setTimeout(() => {
      this.isAddingToCartDone.set(false);
    }, 1000);
  }
}
