import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IReview } from '../../../core/models/product.interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MyToastrService } from '../../../core/services/toastr/my-toastr.service';
import { CreateEditReviewComponent } from '../create-edit-review/create-edit-review.component';
import { ReviewApiService } from '../../../core/services/review/review-api.service';
import { ReviewService } from '../../../core/services/review/review.service';

@Component({
  selector: 'app-review-card',
  imports: [DatePipe, ReactiveFormsModule, CreateEditReviewComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly reviewService = inject(ReviewService);
  private readonly reviewApiService = inject(ReviewApiService);
  private readonly toaster = inject(MyToastrService);

  review = input.required<IReview>();

  userId = computed(() => this.authService.userID());
  isLogged = computed(() => this.authService.isLogged());
  isMyReview = computed(() => {
    return this.userId() === this.review().user._id ? true : false;
  });

  isDropdownOpen = signal(false);
  isDeleting = signal(false);
  isEditing = signal(false);
  isUpdating = signal(false);

  onSubmit = output<{
    review: string;
    rating: number;
  }>();

  hoverRating = signal(0);
  selectedRating = signal(0);

  onOpenDropdown() {
    this.isDropdownOpen.set(true);
  }
  onCloseDropdown() {
    this.isDropdownOpen.set(false);
  }
  onToggleDropdown() {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  onHoverRating(rate: number) {
    this.hoverRating.set(rate);
  }
  onEditRevBtn() {
    this.isEditing.set(true);
  }
  onCancelEdit() {
    this.isEditing.set(false);
  }

  // sub
  onDeleteRev() {
    this.isDeleting.set(true);
    this.reviewApiService.deleteReview(this.review()._id).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.reviewService.upDateReview.set(true);
        this.toaster.success('Your review has been deleted.');
      },
      error: () => {
        this.toaster.error('Failed to delete your review.');
      },
    });
  }
  onSubmitEdit(data: { review: string; rating: number }) {
    this.reviewApiService.updateMyReview(this.review()._id, data).subscribe({
      next: () => {
        this.isEditing.set(false);
        this.reviewService.upDateReview.set(true);
        this.toaster.success('Review updated successfully.');
      },
      error: () => {
        this.isEditing.set(false);
        this.toaster.error('We couldn’t update your review. Please try again.');
      },
    });
  }
}
