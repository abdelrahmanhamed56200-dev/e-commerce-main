import {
  Component,
  ElementRef,
  OnInit,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { IReview } from '../../../../core/models/product.interface';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { ReviewCardSkeletonComponent } from '../../../../shared/ui/review-card-skeleton/review-card-skeleton.component';
import { ReviewCardComponent } from '../../../../shared/ui/review-card/review-card.component';
import { ReviewRes } from '../../interfaces/review-res.interface';
import { CreateEditReviewComponent } from '../../../../shared/ui/create-edit-review/create-edit-review.component';
import { ReviewApiService } from '../../../../core/services/review/review-api.service';
import { ReviewService } from '../../../../core/services/review/review.service';

@Component({
  selector: 'app-products-product-reviews-tap',
  imports: [ReviewCardComponent, ReviewCardSkeletonComponent, CreateEditReviewComponent],
  templateUrl: './products-product-reviews-tap.component.html',
  styleUrl: './products-product-reviews-tap.component.css',
})
export class ProductsProductReviewsTapComponent implements OnInit {
  private readonly reviewApiService = inject(ReviewApiService);
  private readonly reviewService = inject(ReviewService);
  private readonly toastr = inject(MyToastrService);

  productId = input<string>('');
  ratingsAverage = input.required<number>();
  ratingsQuantity = input.required<number>();
  allReviews = input.required<IReview[]>();

  reviews = signal<IReview[]>([]);
  isWriteNewReview = signal(false);
  ratings: (1 | 2 | 3 | 4 | 5)[] = [5, 4, 3, 2, 1];
  page = signal(1);
  limit = signal(5);
  isLoading = signal(false);

  allReviewsPercentage = computed(() => {
    const allReviews = this.allReviews();
    type Keys = Record<1 | 2 | 3 | 4 | 5, number>;
    let obj: Keys = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    if (!allReviews || this.ratingsQuantity() === 0) return obj;
    allReviews.forEach((rev) => {
      obj[rev.rating as keyof typeof obj]++;
    });
    const percentages = {
      1: Math.ceil((obj[1] / this.ratingsQuantity()) * 100),
      2: Math.ceil((obj[2] / this.ratingsQuantity()) * 100),
      3: Math.ceil((obj[3] / this.ratingsQuantity()) * 100),
      4: Math.ceil((obj[4] / this.ratingsQuantity()) * 100),
      5: Math.ceil((obj[5] / this.ratingsQuantity()) * 100),
    };
    return percentages;
  });

  constructor() {
    effect(() => {
      if (this.reviewService.upDateReview()) {
        this.page.set(1);
        this.reviews.set([]);
        this.getReview();
        this.scrollTo()?.nativeElement?.scrollIntoView({
          behavior: 'smooth',
        });
        this.reviewService.upDateReview.set(false);
      }
    });
  }
  ngOnInit(): void {
    this.getReview();
  }

  getReview() {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    const filters = { limit: this.limit(), page: this.page() };

    let review: IReview[] = [];
    this.reviewApiService.getReviewsForProduct(this.productId()!, filters).subscribe({
      next: (res: ReviewRes) => {
        review.push(...this.reviews());
        review.push(...res.data);
        this.reviews.set(review);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
      },
    });
  }

  scrollTo = viewChild<ElementRef>('scrollTo');
  onCreteReview(data: { review: string; rating: number }) {
    this.reviewApiService.createReviewForProduct(this.productId(), data).subscribe({
      next: () => {
        this.isWriteNewReview.set(false);
        this.toastr.success('Your review have been added successfully.');
        this.reviews.set([]);
        this.getReview();
        this.scrollTo()?.nativeElement?.scrollIntoView({
          behavior: 'smooth',
        });
      },
      error: (err) => {
        this.isWriteNewReview.set(false);
        this.toastr.error(err.error.errors?.msg);
        this.scrollTo()?.nativeElement?.scrollIntoView({
          behavior: 'smooth',
        });
      },
    });
  }
  onCancelCreteReview() {
    this.isWriteNewReview.set(false);
  }
  onWriteNewReview() {
    this.isWriteNewReview.set(true);
  }
  onLoadMoreReview() {
    this.page.set(this.page() + 1);
    this.getReview();
  }
}
