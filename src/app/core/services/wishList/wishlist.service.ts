import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, from, Observable, retry } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { APP_APIS } from '../../constants/app-apis';
import { IWishlistProductsRes } from '../../../features/wishlist/interfaces/wishlist-products-res.interface';
import { IAddRemoveWishlistItemRes } from '../../../features/wishlist/interfaces/add-remove-wishlist-item-res.interface';
import { MyToastrService } from '../toastr/my-toastr.service';
import { IProduct } from '../../models/product.interface';
import { WishlistApiService } from './wishlist-api.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly authService = inject(AuthService);
  private readonly wishlistApiService = inject(WishlistApiService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly toastr = inject(MyToastrService);

  isLogged = computed(() => this.authService.isLogged());
  wishlistCount = signal<number>(0);
  wishlistProducts = signal<IProduct[]>([]);
  isLoading = signal(false);

  constructor() {
    effect(() => {
      this.isLogged();
      this.upDateWishlistCounter();
      this.setAllProductsWishlistFromLocalStorage();
    });
  }
  upDateWishlistCounter() {
    this.isLoading.set(true);
    if (this.isLogged()) {
      this.wishlistApiService
        .getProductWishlist()
        .pipe(retry(3))
        .subscribe({
          next: (res: IWishlistProductsRes) => {
            this.wishlistCount.set(res.count);
            this.wishlistProducts.set(res.data);
            this.isLoading.set(false);
          },
          error: () => {
            this.wishlistCount.set(0);
            this.isLoading.set(false);
          },
        });
    } else {
      this.wishlistCount.set(this.localStorageService.getAllWishlistProductsCount());
      this.isLoading.set(false);
    }
  }
  private setAllProductsWishlistFromLocalStorage() {
    if (this.isLogged()) {
      let products = this.localStorageService.getAllWishlistProducts();
      if (!products.length) return;
      from(products)
        .pipe(concatMap((el) => this.wishlistApiService.addProductToWishlist(el._id)))
        .subscribe({
          next: (res) => {
            this.wishlistCount.set(res.data.length);
          },
          complete: () => {
            this.toastr.success('All Products added successfully to your wishlist');
            this.localStorageService.removeAllWishlistProducts();
          },
        });
    }
  }
}
