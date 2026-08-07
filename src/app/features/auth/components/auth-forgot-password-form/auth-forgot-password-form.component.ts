import { Component, effect, HostListener, inject, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthApiService } from '../../../../core/services/auth/auth-api.service';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { AuthInputComponent } from '../auth-input/auth-input.component';
import { AuthSubmitButtonComponent } from '../auth-submit-button/auth-submit-button.component';

@Component({
  selector: 'app-auth-forgot-password-form',
  imports: [AuthSubmitButtonComponent, ReactiveFormsModule, AuthInputComponent],
  templateUrl: './auth-forgot-password-form.component.html',
  styleUrl: './auth-forgot-password-form.component.css',
})
export class AuthForgotPasswordFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly toastr = inject(MyToastrService);
  private readonly router = inject(Router);

  formStep = output<number>();
  email = output<string>();

  isLoading = signal(false);
  step = signal(1);

  emailControl = this.fb.control('', [RxwebValidators.required(), RxwebValidators.email()]);
  verificationCodeControl = this.fb.control('', [
    RxwebValidators.required(),
    RxwebValidators.minLength({ value: 6 }),
    RxwebValidators.maxLength({ value: 6 }),
  ]);
  resetPasswordForm: FormGroup = this.fb.group({
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
  });

  constructor() {
    effect(() => {
      this.formStep.emit(this.step());
    });
  }

  onChangeEmail() {
    this.step.set(1);
  }

  @HostListener('window:keydown.enter')
  onKeydown() {
    this.onSubmit();
  }
  onSubmit() {
    if (this.isLoading()) return;
    if (this.step() === 1) this.emailStep();
    else if (this.step() === 2) this.verificationCodeStep();
    else if (this.step() === 3) this.resetPasswordStep();
    else if (this.step() === 4) this.navigateTo();
  }

  // email step
  emailStep() {
    this.emailControl.markAllAsTouched();
    if (this.emailControl.invalid) return;
    this.isLoading.set(true);
    this.submitEmail();
  }
  submitEmail() {
    this.authApiService.forgotPasswords(this.emailControl.value!).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.step.set(2);
        this.email.emit(this.emailControl.value!);
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.toastr.error(err.error?.message || 'Something went wrong');
      },
    });
  }
  onResendCode() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.submitEmail();
  }

  // verification Code step
  verificationCodeStep() {
    this.verificationCodeControl.markAllAsTouched();
    if (this.verificationCodeControl.invalid) return;
    this.isLoading.set(true);
    this.submitVerificationCode();
  }
  submitVerificationCode() {
    this.authApiService.verifyResetCode(this.verificationCodeControl.value!).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.step.set(3);
        this.toastr.success('Code verified!');
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
        this.toastr.error(err.error?.message || 'Something went wrong');
      },
    });
  }

  // reset password
  resetPasswordStep() {
    this.resetPasswordForm.markAllAsTouched();
    if (this.resetPasswordForm.invalid) return;
    this.isLoading.set(true);
    this.submitResetPassword();
  }
  submitResetPassword() {
    this.authApiService
      .resetPassword({
        email: this.emailControl.value!,
        newPassword: this.resetPasswordForm.value.password,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading.set(false);
          this.step.set(4);
          this.toastr.success('Password reset successfully!');
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
          this.toastr.error(err.error?.message || 'Something went wrong');
        },
      });
  }

  navigateTo() {
    this.resetAll();
    this.router.navigate(['/login']);
  }

  resetAll() {
    this.step.set(1);
    this.emailControl.reset();
    this.verificationCodeControl.reset();
    this.resetPasswordForm.reset();
  }
}
