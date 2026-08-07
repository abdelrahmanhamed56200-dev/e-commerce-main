import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_APIS } from '../../constants/app-apis';
import {
  IOrder,
  IOrdersResponse,
} from '../../../features/orders/interfaces/orders-response.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersApiService {
  private readonly http = inject(HttpClient);

  createCashOrderFromCart_v2(
    cartId: string,
    shippingAddress: {
      details: String;
      phone: String;
      city: String;
      postalCode: String;
    },
  ): Observable<any> {
    return this.http.post(APP_APIS.orders.createCash_v2 + cartId, {
      shippingAddress: shippingAddress,
    });
  }

  createCashOrderFromCart_v1(
    cartId: string,
    shippingAddress: {
      details: String;
      phone: String;
      city: String;
    },
  ): Observable<any> {
    return this.http.post(APP_APIS.orders.base_v1 + cartId, {
      shippingAddress: shippingAddress,
    });
  }

  getAllOrders(): Observable<IOrdersResponse> {
    return this.http.get<IOrdersResponse>(APP_APIS.orders.base_v1);
  }
  getUserOrders(userId: string): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(APP_APIS.orders.base_v1 + 'user/' + userId);
  }

  checkoutSession(
    cartId: string,
    redirectUrl: string,
    shippingAddress: {
      details: String;
      phone: String;
      city: String;
    },
  ): Observable<any> {
    return this.http.post(
      APP_APIS.orders.checkoutSession + cartId,
      {
        shippingAddress: shippingAddress,
      },
      { params: { url: redirectUrl } },
    );
  }
}
