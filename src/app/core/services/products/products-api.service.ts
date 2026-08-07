import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_APIS } from '../../constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(filters?: filters): Observable<any> {
    return this.httpClient.get(APP_APIS.products, { params: this.setFilters(filters) });
  }
  getSpecificProduct(productId: string): Observable<any> {
    return this.httpClient.get(APP_APIS.products + productId);
  }

  private setFilters(filters?: filters) {
    let params = new HttpParams();

    if (filters?.limit) params = params.append('limit', filters.limit);
    if (filters?.q) params = params.append('q', filters.q);
    if (filters?.sort && filters.sort !== 'relevance') params = params.append('sort', filters.sort);
    if (filters?.page && filters.page !== 1) params = params.append('page', filters.page);

    filters?.brand?.forEach((b) => {
      params = params.append('brand', b);
    });

    filters?.category?.forEach((c) => {
      params = params.append('category[in]', c);
    });

    if (filters?.subcategory) params = params.append('subcategory', filters.subcategory);

    if (filters?.maxPrice) params = params.append('price[gte]', filters.maxPrice);
    if (filters?.minPrice) params = params.append('price[lte]', filters.minPrice);

    return params;
  }
}

type filters = {
  limit?: number;
  q?: string;
  sort?: string;
  page?: number;
  brand?: string[];
  category?: string[];
  subcategory?: string;
  maxPrice?: string;
  minPrice?: string;
};
