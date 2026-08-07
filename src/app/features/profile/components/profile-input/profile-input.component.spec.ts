import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInputComponent } from './profile-input.component';

describe('ProfileInputComponent', () => {
  let component: ProfileInputComponent;
  let fixture: ComponentFixture<ProfileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
