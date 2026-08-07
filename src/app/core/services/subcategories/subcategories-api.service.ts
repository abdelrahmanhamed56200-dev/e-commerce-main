import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_APIS } from '../../constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesApiService {
  private readonly httpClient = inject(HttpClient);

  getAllSubCategories(filter?: {}): Observable<any> {
    const params = new HttpParams({
      fromObject: filter,
    });
    return this.httpClient.get(APP_APIS.subCategories, { params: params });
  }
  getSpecificSubCategory(subCategoryId: string): Observable<any> {
    return this.httpClient.get(APP_APIS.subCategories + subCategoryId);
  }
  getAllSubCategoriesOnCategory(categoryId: string): Observable<any> {
    return this.httpClient.get(APP_APIS.categories + `${categoryId}/subcategories`);
  }
}
