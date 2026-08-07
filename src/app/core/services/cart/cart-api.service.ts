import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartRes } from '../../../features/cart/interfaces/cart-res.interface';
import { APP_APIS } from '../../constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private readonly httpClient = inject(HttpClient);

  getAllProductCart_v2(): Observable<ICartRes> {
    return this.httpClient.get<ICartRes>(APP_APIS.cart.cart_v2);
  }
  addProductToCart_v2(productId: string): Observable<ICartRes> {
    return this.httpClient.post<ICartRes>(APP_APIS.cart.cart_v2, {
      productId: productId,
    });
  }
  updateProductCartQuantity_v2(productId: string, count: number): Observable<ICartRes> {
    return this.httpClient.put<ICartRes>(APP_APIS.cart.cart_v2 + productId, {
      count: count,
    });
  }
  removeProductFromCart_v2(productId: string): Observable<ICartRes> {
    return this.httpClient.delete<ICartRes>(APP_APIS.cart.cart_v2 + productId);
  }
  clearCart_v2(): Observable<ICartRes> {
    return this.httpClient.delete<ICartRes>(APP_APIS.cart.cart_v2);
  }
  applyCouponToCart_v2(couponName: string): Observable<any> {
    return this.httpClient.put(APP_APIS.cart.applyCoupon_v2, {
      couponName: couponName,
    });
  }
}
