import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTrustBadgesComponent } from './auth-trust-badges.component';

describe('AuthTrustBadgesComponent', () => {
  let component: AuthTrustBadgesComponent;
  let fixture: ComponentFixture<AuthTrustBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTrustBadgesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthTrustBadgesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
