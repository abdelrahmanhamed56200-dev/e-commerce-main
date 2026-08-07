import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthErrorMassageComponent } from './auth-error-massage.component';

describe('AuthErrorMassageComponent', () => {
  let component: AuthErrorMassageComponent;
  let fixture: ComponentFixture<AuthErrorMassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthErrorMassageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthErrorMassageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
