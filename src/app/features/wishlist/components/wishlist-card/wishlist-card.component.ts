import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../../core/models/product.interface';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { WishlistService } from '../../../../core/services/wishList/wishlist.service';
import { IAddRemoveWishlistItemRes } from '../../interfaces/add-remove-wishlist-item-res.interface';
import { CartApiService } from '../../../../core/services/cart/cart-api.service';
import { WishlistApiService } from '../../../../core/services/wishList/wishlist-api.service';

@Component({
  selector: 'app-wishlist-card',
  imports: [RouterLink],
  templateUrl: './wishlist-card.component.html',
  styleUrl: './wishlist-card.component.css',
})
export class WishlistCardComponent {
  private readonly cartService = inject(CartService);
  private readonly cartApiService = inject(CartApiService);
  private readonly authService = inject(AuthService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly wishlistService = inject(WishlistService);
  private readonly wishlistApiService = inject(WishlistApiService);
  private readonly toastr = inject(MyToastrService);

  wishlistProduct = input.required<IProduct>();
  isInCart = computed(() =>
    this.cartService.cartProducts().some((p) => p.product._id === this.wishlistProduct()._id),
  );

  isLogged = computed(() => this.authService.isLogged());
  isAddedToWishlist = signal(false);
  isRemovingFromWishlist = signal(false);
  isAddingToCart = signal(false);

  // wishlist
  onRemoveProductFromWishlist() {
    if (this.isRemovingFromWishlist()) return;
    this.isRemovingFromWishlist.set(true);
    if (this.isLogged()) {
      this.subRemoveProductFromWishlist();
    } else if (isPlatformBrowser(this.pLATFORM_ID) && !this.isLogged()) {
      this.localStorageService.toggleProductToWishlist(this.wishlistProduct());
      this.isRemovingFromWishlist.set(false);
      this.isAddedToWishlist.set(!this.isAddedToWishlist());
      this.wishlistService.upDateWishlistCounter();
    }
  }
  subRemoveProductFromWishlist() {
    this.wishlistApiService.removeProductToWishlist(this.wishlistProduct()._id).subscribe({
      next: (res: IAddRemoveWishlistItemRes) => {
        res.data.find((id) => id === this.wishlistProduct()._id)
          ? this.isAddedToWishlist.set(true)
          : this.isAddedToWishlist.set(false);
        this.isRemovingFromWishlist.set(false);
        this.wishlistService.upDateWishlistCounter();
      },
      error: () => {
        this.isRemovingFromWishlist.set(false);
        this.wishlistService.upDateWishlistCounter();
      },
    });
  }

  // cart
  onAddProductToCart() {
    if (this.isAddingToCart()) return;
    this.isAddingToCart.set(true);

    if (this.isLogged()) {
      this.subAddProductToCart();
    } else if (isPlatformBrowser(this.pLATFORM_ID) && !this.isLogged()) {
      this.localStorageService.addProductToCart(this.wishlistProduct(), 1);
      this.isAddingToCart.set(false);
      this.cartService.upDateCart();
    }
  }
  subAddProductToCart() {
    this.cartApiService.addProductToCart_v2(this.wishlistProduct()._id).subscribe({
      next: () => {
        this.isAddingToCart.set(false);
        this.cartService.upDateCart();
      },
      error: () => {
        this.isAddingToCart.set(false);
        this.cartService.upDateCart();
        this.toastr.error('Failed to add product to cart!');
      },
    });
  }
}
