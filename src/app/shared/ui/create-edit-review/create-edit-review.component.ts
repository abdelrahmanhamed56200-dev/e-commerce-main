import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit-review',
  imports: [ReactiveFormsModule],
  templateUrl: './create-edit-review.component.html',
  styleUrl: './create-edit-review.component.css',
})
export class CreateEditReviewComponent {
  private readonly fb = inject(FormBuilder);

  selectedRat = input<number>(0);
  text = input<string>('');

  onSubmit = output<{
    review: string;
    rating: number;
  }>();
  onCancel = output();

  textInput: FormControl = this.fb.control('', [Validators.required]);
  hoverRating = signal(0);
  selectedRating = signal(0);
  isLoading = signal(false);
  isSelectedRating = signal(false);

  ngOnInit(): void {
    this.selectedRating.set(this.selectedRat());
    this.textInput.setValue(this.text());
  }

  onSelectRating(rate: number) {
    this.isSelectedRating.set(false);
    this.selectedRating.set(rate);
  }
  onHoverRating(rate: number) {
    this.hoverRating.set(rate);
  }
  submit() {
    this.textInput.markAllAsTouched();
    if (this.selectedRating() === 0) {
      this.isSelectedRating.set(true);
      return;
    }
    if (this.textInput.invalid) return;
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.onSubmit.emit({ rating: this.selectedRating(), review: this.textInput.value });
  }
  cancel() {
    if (this.isLoading()) return;
    this.onCancel.emit();
  }
}
