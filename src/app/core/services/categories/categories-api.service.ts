import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_APIS } from '../../constants/app-apis';
import { IAllCategoriesResponse } from '../../models/all-categories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  private readonly httpClient = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this.httpClient.get<IAllCategoriesResponse>(APP_APIS.categories);
  }
  getSpecificCategory(categoryId: string): Observable<any> {
    return this.httpClient.get<IAllCategoriesResponse>(APP_APIS.categories + categoryId);
  }
}
