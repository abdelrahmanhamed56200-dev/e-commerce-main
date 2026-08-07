import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthForgotPasswordHeroComponent } from './auth-forgot-password-hero.component';

describe('AuthForgotPasswordHeroComponent', () => {
  let component: AuthForgotPasswordHeroComponent;
  let fixture: ComponentFixture<AuthForgotPasswordHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthForgotPasswordHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthForgotPasswordHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
