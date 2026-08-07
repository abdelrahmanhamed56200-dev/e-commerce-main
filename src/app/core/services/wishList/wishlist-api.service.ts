import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddRemoveWishlistItemRes } from '../../../features/wishlist/interfaces/add-remove-wishlist-item-res.interface';
import { IWishlistProductsRes } from '../../../features/wishlist/interfaces/wishlist-products-res.interface';
import { APP_APIS } from '../../constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class WishlistApiService {
  private readonly httpClient = inject(HttpClient);

  addProductToWishlist(productId: string): Observable<IAddRemoveWishlistItemRes> {
    return this.httpClient.post<IAddRemoveWishlistItemRes>(APP_APIS.wishlist, {
      productId: productId,
    });
  }
  removeProductToWishlist(productId: string): Observable<IAddRemoveWishlistItemRes> {
    return this.httpClient.delete<IAddRemoveWishlistItemRes>(APP_APIS.wishlist + productId);
  }
  getProductWishlist(): Observable<IWishlistProductsRes> {
    return this.httpClient.get<IWishlistProductsRes>(APP_APIS.wishlist);
  }
}
