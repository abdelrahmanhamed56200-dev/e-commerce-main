import { Component, signal } from '@angular/core';
import { AuthForgotPasswordFormComponent } from '../../components/auth-forgot-password-form/auth-forgot-password-form.component';
import { AuthForgotPasswordHeroComponent } from '../../components/auth-forgot-password-hero/auth-forgot-password-hero.component';
import { AuthFormFooterLinkComponent } from '../../components/auth-form-footer-link/auth-form-footer-link.component';
import { AuthFormTitleComponent } from '../../components/auth-form-title/auth-form-title.component';

@Component({
  selector: 'app-forgot-password-page',
  imports: [
    AuthForgotPasswordHeroComponent,
    AuthFormFooterLinkComponent,
    AuthFormTitleComponent,
    AuthForgotPasswordFormComponent,
  ],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css',
})
export class ForgotPasswordPageComponent {
  step = signal(1);
  email = signal('');

  setFormStep(step: number) {
    this.step.set(step);
  }
  setEmail(email: string) {
    this.email.set(email);
  }

  formTitle = ['Forgot Password?', 'Check Your Email', 'Create New Password', 'Password Reset!'];
  formTitleText = [
    "No worries, we'll send you a reset code",
    `Enter the 6-digit code sent to ${this.email()}`,
    'Your new password must be different from previous passwords',
    'Your password has been successfully reset. You can now sign in with your new password.',
  ];
}
