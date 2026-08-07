import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormFooterLinkComponent } from './auth-form-footer-link.component';

describe('AuthFormFooterLinkComponent', () => {
  let component: AuthFormFooterLinkComponent;
  let fixture: ComponentFixture<AuthFormFooterLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormFooterLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormFooterLinkComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
