import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_APIS } from '../../constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class BrandsApiService {
  private readonly httpClient = inject(HttpClient);

  getAllBrands(filter?: {}): Observable<any> {
    const params = new HttpParams({
      fromObject: filter,
    });
    return this.httpClient.get(APP_APIS.brands, {
      params: params,
    });
  }

  getSpecificBrand(brandId: string, filter?: {}): Observable<any> {
    const params = new HttpParams({
      fromObject: filter,
    });
    return this.httpClient.get(APP_APIS.brands + brandId, {
      params: params,
    });
  }
}
