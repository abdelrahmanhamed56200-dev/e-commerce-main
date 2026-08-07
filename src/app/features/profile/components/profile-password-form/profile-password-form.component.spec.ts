import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePasswordFormComponent } from './profile-password-form.component';

describe('ProfilePasswordFormComponent', () => {
  let component: ProfilePasswordFormComponent;
  let fixture: ComponentFixture<ProfilePasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePasswordFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePasswordFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
