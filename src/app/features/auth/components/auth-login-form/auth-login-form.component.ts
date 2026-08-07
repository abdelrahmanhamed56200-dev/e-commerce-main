import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import { IUserRes } from '../../../../core/models/user-res.interface';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { AuthInputComponent } from '../auth-input/auth-input.component';
import { AuthSubmitButtonComponent } from '../auth-submit-button/auth-submit-button.component';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { AuthApiService } from '../../../../core/services/auth/auth-api.service';

@Component({
  selector: 'app-auth-login-form',
  imports: [
    AuthSubmitButtonComponent,
    ɵInternalFormsSharedModule,
    RouterLink,
    AuthInputComponent,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  templateUrl: './auth-login-form.component.html',
  styleUrl: './auth-login-form.component.css',
})
export class AuthLoginFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly authApiService = inject(AuthApiService);
  private readonly toastr = inject(MyToastrService);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [RxwebValidators.required(), RxwebValidators.email()]],
    password: ['', [RxwebValidators.required(), RxwebValidators.minLength({ value: 8 })]],
    rememberMe: [false],
  });

  isLoading = signal(false);
  redirectTo = input<string>('');

  onSubmit() {
    if (this.isLoading()) return;
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    this.isLoading.set(true);
    this.submitUser();
  }

  submitUser() {
    this.authApiService.signin(this.loginForm.value).subscribe({
      next: (res: IUserRes) => {
        this.isLoading.set(false);
        this.toastr.success('login successful');
        this.loginForm.reset();

        this.authService.isLogged.set(true);
        this.authService.user.set(res.user);
        this.localStorageService.setUserToken(res.token);
        this.localStorageService.setUser(res);
        this.authService.checkVerifyToken();
        if (this.redirectTo()) {
          this.router.navigate([this.redirectTo()]);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.toastr.error(err.error?.message || 'Something went wrong');
        this.authService.isLogged.set(false);
      },
    });
  }
}
