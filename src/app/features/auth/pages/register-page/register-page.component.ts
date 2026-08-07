import { Component, inject, signal } from '@angular/core';
import { AuthRegisterHeroComponent } from '../../components/auth-register-hero/auth-register-hero.component';
import { AuthFormTitleComponent } from '../../components/auth-form-title/auth-form-title.component';
import { AuthSocialButtonsComponent } from '../../components/auth-social-buttons/auth-social-buttons.component';
import { AuthDividerComponent } from '../../components/auth-divider/auth-divider.component';
import { AuthFormFooterLinkComponent } from '../../components/auth-form-footer-link/auth-form-footer-link.component';
import { ActivatedRoute } from '@angular/router';
import { AuthRegisterFormComponent } from '../../components/auth-register-form/auth-register-form.component';

@Component({
  selector: 'app-register-page',
  imports: [
    AuthRegisterHeroComponent,
    AuthFormTitleComponent,
    AuthSocialButtonsComponent,
    AuthDividerComponent,
    AuthFormFooterLinkComponent,
    AuthRegisterFormComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  redirectTo = signal('');

  ngOnInit(): void {
    this.redirectTo.set(this.activatedRoute.snapshot.queryParams['redirectTo']);
  }
  onSocialSelect(value: 'facebook' | 'google') {
    console.log(value);
  }
}
