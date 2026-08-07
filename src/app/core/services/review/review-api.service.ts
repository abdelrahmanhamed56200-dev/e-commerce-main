import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_APIS } from '../../constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class ReviewApiService {
  private readonly http = inject(HttpClient);

  createReviewForProduct(
    productId: string,
    review: { review: string; rating: number },
  ): Observable<any> {
    return this.http.post(APP_APIS.products + productId + '/reviews/', review);
  }

  getReviewsForProduct(
    productId: string,
    filters?: { limit?: number; page?: number },
  ): Observable<any> {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get(APP_APIS.products + productId + '/reviews/', { params: params });
  }

  getReviewById(reviewId: string): Observable<any> {
    return this.http.get(APP_APIS.reviews + reviewId);
  }

  updateMyReview(reviewId: string, review: { review: string; rating: number }): Observable<any> {
    return this.http.put(APP_APIS.reviews + reviewId, review);
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(APP_APIS.reviews + reviewId);
  }
}
