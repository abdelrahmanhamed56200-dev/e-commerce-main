import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthApiService } from '../../../../core/services/auth/auth-api.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { ProfileInputComponent } from '../profile-input/profile-input.component';

@Component({
  selector: 'app-profile-info-form',
  imports: [FormsModule, ReactiveFormsModule, ProfileInputComponent],
  templateUrl: './profile-info-form.component.html',
  styleUrl: './profile-info-form.component.css',
})
export class ProfileInfoFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly authApiService = inject(AuthApiService);
  private readonly toastrService = inject(MyToastrService);

  form = this.fb.group(
    {
      name: [
        '',
        [
          RxwebValidators.required(),
          RxwebValidators.minLength({ value: 2 }),
          RxwebValidators.pattern({
            expression: {
              onlyLettersAndSpaces: /^[A-Za-z\s]+$/,
            },
          }),
        ],
      ],
      email: ['', [RxwebValidators.required(), RxwebValidators.email()]],
      phone: [
        '',
        [
          RxwebValidators.required(),
          RxwebValidators.pattern({
            expression: {
              egyptPhone: /^(?:\+2|002)?01[0125][0-9]{8}$/,
            },
          }),
        ],
      ],
    },
    { nullable: true },
  );

  isLoading = signal(false);

  onSubmit() {
    if (this.isLoading()) return;

    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.authApiService.updateLoggedUserData(this.form.value).subscribe({
      next: (res) => {
        this.form.reset();
        this.isLoading.set(false);
        this.authService.user.set(res.user);
        this.toastrService.success('Profile updated successfully');
      },
      error: (err) => {
        this.isLoading.set(false);
        this.toastrService.error(err.error.errors.msg);
        this.form.reset();
      },
    });
  }
}
