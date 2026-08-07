import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthDividerComponent } from '../../components/auth-divider/auth-divider.component';
import { AuthFormFooterLinkComponent } from '../../components/auth-form-footer-link/auth-form-footer-link.component';
import { AuthFormTitleComponent } from '../../components/auth-form-title/auth-form-title.component';
import { AuthLoginFormComponent } from '../../components/auth-login-form/auth-login-form.component';
import { AuthLoginHeroComponent } from '../../components/auth-login-hero/auth-login-hero.component';
import { AuthSocialButtonsComponent } from '../../components/auth-social-buttons/auth-social-buttons.component';
import { AuthTrustBadgesComponent } from '../../components/auth-trust-badges/auth-trust-badges.component';

@Component({
  selector: 'app-login-page',
  imports: [
    AuthLoginHeroComponent,
    AuthFormTitleComponent,
    AuthSocialButtonsComponent,
    AuthDividerComponent,
    AuthTrustBadgesComponent,
    AuthFormFooterLinkComponent,
    AuthLoginFormComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);

  redirectTo = signal('');

  ngOnInit(): void {
    this.redirectTo.set(this.activatedRoute.snapshot.queryParams['redirectTo']);
  }
  onSocialSelect(value: 'facebook' | 'google') {
    console.log(value);
  }
}
