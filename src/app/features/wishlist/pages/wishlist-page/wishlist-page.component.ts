import { Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { IProduct } from '../../../../core/models/product.interface';
import { BreadcrumbsCardComponent } from '../../../../shared/ui/breadcrumbs-card/breadcrumbs-card.component';
import { WishlistAllCardsComponent } from '../../components/wishlist-all-cards/wishlist-all-cards.component';
import { WishlistService } from '../../../../core/services/wishList/wishlist.service';
import { WishlistActionsComponent } from '../../components/wishlist-actions/wishlist-actions.component';
import { WishlistEmptyWishlistComponent } from '../../components/wishlist-empty-wishlist/wishlist-empty-wishlist.component';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-wishlist-page',
  imports: [
    BreadcrumbsCardComponent,
    WishlistAllCardsComponent,
    WishlistActionsComponent,
    WishlistEmptyWishlistComponent,
  ],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css',
})
export class WishlistPageComponent {
  private readonly wishlistService = inject(WishlistService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  private readonly localStorageService = inject(LocalStorageService);

  wishlistCount = computed(() => this.wishlistService.wishlistCount());
  wishlistProducts = signal<IProduct[]>([]);
  isLogged = computed(() => this.authService.isLogged());
  isLoading = computed(() => this.wishlistService.isLoading());
  isEmpty = signal(false);

  constructor() {
    effect(() => {
      this.wishlistService.wishlistCount();
      this.getWishlistProduct();

      if (!this.isLoading() && this.wishlistService.wishlistCount() === 0) {
        this.isEmpty.set(true);
      } else this.isEmpty.set(false);
    });
  }

  getWishlistProduct() {
    if (this.isLogged()) {
      this.wishlistProducts.set(this.wishlistService.wishlistProducts());
    } else if (isPlatformBrowser(this.pLATFORM_ID) && !this.isLogged()) {
      this.wishlistProducts.set(this.localStorageService.getAllWishlistProducts());
    }
  }
}
