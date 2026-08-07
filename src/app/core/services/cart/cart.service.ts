import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { concatMap, from, retry } from 'rxjs';
import { ICartRes, IProductCart } from '../../../features/cart/interfaces/cart-res.interface';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { MyToastrService } from '../toastr/my-toastr.service';
import { CartApiService } from './cart-api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly authService = inject(AuthService);
  private readonly cartApiService = inject(CartApiService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly toastr = inject(MyToastrService);

  isLogged = computed(() => this.authService.isLogged());
  cartCount = signal<number>(0);
  cartProducts = signal<IProductCart[]>([]);
  isLoading = signal(false);

  constructor() {
    effect(() => {
      this.isLogged();
      this.upDateCart();
      this.setAllProductsCartFromLocalStorage();
    });
  }
  upDateCart() {
    this.isLoading.set(true);

    if (this.isLogged()) {
      this.cartApiService
        .getAllProductCart_v2()
        .pipe(retry(3))
        .subscribe({
          next: (res: ICartRes) => {
            this.cartCount.set(res.numOfCartItems);
            this.cartProducts.set(res.data.products);
            this.isLoading.set(false);
          },
          error: (err) => {
            this.cartCount.set(0);
            this.isLoading.set(false);
            this.toastr.error(err.error.message);
          },
        });
    } else {
      this.cartCount.set(this.localStorageService.getCartProductsCount());
      this.cartProducts.set(this.localStorageService.getAllCartProducts());
      this.isLoading.set(false);
    }
  }
  private setAllProductsCartFromLocalStorage() {
    if (this.isLogged()) {
      let products = this.localStorageService.getAllCartProducts();
      if (!products.length) return;

      let nestedProducts = products.filter((el) => {
        return el.count > 1;
      });

      from(products)
        .pipe(concatMap((el) => this.cartApiService.addProductToCart_v2(el.product._id)))
        .subscribe({
          next: (res) => {
            this.cartCount.set(res.numOfCartItems);
          },
          complete: () => {
            if (nestedProducts.length) {
              from(nestedProducts)
                .pipe(
                  concatMap((el) =>
                    this.cartApiService.updateProductCartQuantity_v2(el.product._id, el.count),
                  ),
                )
                .subscribe({
                  next: (res) => {
                    this.cartCount.set(res.numOfCartItems);
                  },
                  complete: () => {
                    this.toastr.success('All Product Added To Card Successfully');
                    this.localStorageService.removeAllCartProducts();
                  },
                });
            } else {
              this.toastr.success('All Product Added To Card Successfully');
              this.localStorageService.removeAllCartProducts();
            }
          },
        });
    }
  }
}
