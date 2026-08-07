import { isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { BreadcrumbsCardComponent } from '../../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { CartActionsComponent } from '../../components/cart-actions/cart-actions.component';
import { CartAllCardsComponent } from '../../components/cart-all-cards/cart-all-cards.component';
import { CartEmptyComponent } from '../../components/cart-empty/cart-empty.component';
import { CartOrderSummaryCardComponent } from '../../components/cart-order-summary-card/cart-order-summary-card.component';
import { IProductCart } from '../../interfaces/cart-res.interface';

@Component({
  selector: 'app-cart-page',
  imports: [
    CartActionsComponent,
    CartEmptyComponent,
    BreadcrumbsCardComponent,
    CartOrderSummaryCardComponent,
    CartAllCardsComponent,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly localStorageService = inject(LocalStorageService);

  products = signal<IProductCart[]>([]);
  // isEmpty = signal(false);
  totalPrice = signal(0);

  numberOfItems = computed(() => this.cartService.cartCount());
  isLoading = computed(() => this.cartService);
  isLogged = computed(() => this.authService.isLogged());
  isFirstLoad = signal(true);

  constructor() {
    effect(() => {
      this.cartService.cartProducts();
      this.numberOfItems();
      this.getWishlistProduct();
      this.calcTotalPrice();
      setTimeout(() => {
        this.isFirstLoad.set(false);
      }, 2000);
    });
  }
  getWishlistProduct() {
    if (this.isLogged()) {
      this.products.set(this.cartService.cartProducts());
    } else if (isPlatformBrowser(this.pLATFORM_ID) && !this.isLogged()) {
      this.products.set(this.localStorageService.getAllCartProducts());
    }
  }
  calcTotalPrice() {
    let total = 0;
    this.products().forEach((prod) => {
      total += prod.count * prod.price;
    });
    this.totalPrice.set(total);
  }
}
