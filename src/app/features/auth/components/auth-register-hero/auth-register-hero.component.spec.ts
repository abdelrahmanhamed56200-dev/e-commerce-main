import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterHeroComponent } from './auth-register-hero.component';

describe('AuthRegisterHeroComponent', () => {
  let component: AuthRegisterHeroComponent;
  let fixture: ComponentFixture<AuthRegisterHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRegisterHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthRegisterHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
