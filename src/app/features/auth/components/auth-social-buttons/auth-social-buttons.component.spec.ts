import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSocialButtonsComponent } from './auth-social-buttons.component';

describe('AuthSocialButtonsComponent', () => {
  let component: AuthSocialButtonsComponent;
  let fixture: ComponentFixture<AuthSocialButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSocialButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthSocialButtonsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
