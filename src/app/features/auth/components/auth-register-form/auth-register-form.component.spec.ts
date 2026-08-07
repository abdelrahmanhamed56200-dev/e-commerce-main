import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterFormComponent } from './auth-register-form.component';

describe('AuthRegisterFormComponent', () => {
  let component: AuthRegisterFormComponent;
  let fixture: ComponentFixture<AuthRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRegisterFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthRegisterFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
