import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginHeroComponent } from './auth-login-hero.component';

describe('AuthLoginHeroComponent', () => {
  let component: AuthLoginHeroComponent;
  let fixture: ComponentFixture<AuthLoginHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLoginHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLoginHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
