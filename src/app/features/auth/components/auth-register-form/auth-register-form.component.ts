import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUserRes } from '../../../../core/models/user-res.interface';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { AuthInputComponent } from '../auth-input/auth-input.component';
import { AuthSubmitButtonComponent } from '../auth-submit-button/auth-submit-button.component';
import { MyToastrService } from '../../../../core/services/toastr/my-toastr.service';
import { AuthApiService } from '../../../../core/services/auth/auth-api.service';

@Component({
  selector: 'app-auth-register-form',
  imports: [
    AuthInputComponent,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    AuthSubmitButtonComponent,
    RouterLink,
  ],
  templateUrl: './auth-register-form.component.html',
  styleUrl: './auth-register-form.component.css',
})
export class AuthRegisterFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly toastr = inject(MyToastrService);
  private readonly router = inject(Router);

  registerForm: FormGroup = this.fb.group({
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
    terms: [false, [RxwebValidators.requiredTrue()]],
  });

  isLoading = signal(false);

  redirectTo = input<string>('');
  score = signal(0);
  passwordScoreStrong = signal('week');
  passwordScoreColor = signal('red');

  ngOnInit(): void {
    this.passwordScore();
  }
  onSubmit() {
    if (this.isLoading()) return;
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.registerForm.controls['rePassword'].setValue('');
      return;
    }
    this.isLoading.set(true);
    this.submitUser();
  }
  submitUser() {
    this.authApiService.signup(this.registerForm.value).subscribe({
      next: (res: IUserRes) => {
        this.isLoading.set(false);
        this.router.navigate(['/login'], {
          queryParams: {
            redirectTo: this.redirectTo(),
          },
        });
        this.toastr.success('Account created successfully');
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.toastr.error(err.error?.message || 'Something went wrong');
      },
    });
  }

  passwordScore() {
    this.registerForm.get('password')?.valueChanges.subscribe((value: string) => {
      this.score.set(0);
      if (/[@#$%&!?*]/.test(value)) this.score.set(this.score() + 1);
      if (/[A-Z]/.test(value)) this.score.set(this.score() + 1);
      if (/[a-z]/.test(value)) this.score.set(this.score() + 1);
      if (/[\d]/.test(value)) this.score.set(this.score() + 1);
      if (value.length >= 8) this.score.set(this.score() + 1);
      if (value.length >= 12) this.score.set(this.score() + 1);
      if (value.length >= 16) this.score.set(this.score() + 1);
      this.setValuesScorePassword();
    });
  }
  setValuesScorePassword() {
    switch (this.score()) {
      case 1:
        {
          this.passwordScoreStrong.set('week');
          this.passwordScoreColor.set('red');
        }
        break;
      case 2:
        {
          this.passwordScoreStrong.set('Week');
          this.passwordScoreColor.set('red');
        }
        break;
      case 3:
        {
          this.passwordScoreStrong.set('Fair');
          this.passwordScoreColor.set('orange');
        }
        break;
      case 4:
        {
          this.passwordScoreStrong.set('Good');
          this.passwordScoreColor.set('oklch(62.3% 0.214 259.815)');
        }
        break;
      case 5:
        {
          this.passwordScoreStrong.set('Strong');
          this.passwordScoreColor.set('green');
        }
        break;
      case 6:
        {
          this.passwordScoreStrong.set('Strong');
          this.passwordScoreColor.set('green');
        }
        break;
      case 7:
        {
          this.passwordScoreStrong.set('Strong');
          this.passwordScoreColor.set('green');
        }
        {
        }
        break;
      default:
        {
          this.passwordScoreStrong.set('week');
          this.passwordScoreColor.set('red');
        }
        break;
    }
  }
}
