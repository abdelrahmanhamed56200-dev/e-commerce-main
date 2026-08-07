import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_APIS } from '../../constants/app-apis';
import { IAddressesResponse } from '../../models/addresses-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AddressApiService {
  private readonly http = inject(HttpClient);

  addAddress(data: { name: any; details: any; phone: any; city: any; _id?: any }): Observable<any> {
    return this.http.post(APP_APIS.user.addresses, data);
  }
  removeAddress(addressId: string): Observable<any> {
    return this.http.delete(APP_APIS.user.addresses + addressId);
  }
  getSpecificAddress(addressId: string): Observable<any> {
    return this.http.get(APP_APIS.user.addresses + addressId);
  }
  getLoggedUserAddresses(): Observable<IAddressesResponse> {
    return this.http.get<IAddressesResponse>(APP_APIS.user.addresses);
  }
}
