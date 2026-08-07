import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  upDateReview = signal(false);
}
