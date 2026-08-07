import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthApiService } from '../../../../core/services/auth/auth-api.service';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { ProfileInputComponent } from '../profile-input/profile-input.component';

@Component({
  selector: 'app-profile-password-form',
  imports: [ReactiveFormsModule, ProfileInputComponent],
  templateUrl: './profile-password-form.component.html',
  styleUrl: './profile-password-form.component.css',
})
export class ProfilePasswordFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly toastrService = inject(MyToastrService);

  form = this.fb.group(
    {
      currentPassword: [
        '',
        [
          RxwebValidators.required(),
          RxwebValidators.password({
            validation: {
              minLength: 8,
              digit: true,
              specialCharacter: true,
              upperCase: true,
              lowerCase: true,
            },
          }),
        ],
      ],
      password: [
        '',
        [
          RxwebValidators.required(),
          RxwebValidators.password({
            validation: {
              minLength: 8,
              digit: true,
              specialCharacter: true,
              upperCase: true,
              lowerCase: true,
            },
          }),
        ],
      ],
      rePassword: [
        '',
        [
          RxwebValidators.compose({
            validators: [
              RxwebValidators.required(),
              RxwebValidators.compare({ fieldName: 'password' }),
            ],
          }),
        ],
      ],
    },
    { nullable: false },
  );

  isLoading = signal(false);

  onSubmit() {
    if (this.isLoading()) return;

    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.authApiService.changeMyPassword(this.form.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.localStorageService.setUserToken(res.token);
        this.toastrService.success('Password changed successfully');
        this.form.reset();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.toastrService.error(err.error.errors.msg);
        this.form.reset();
      },
    });
  }
}
