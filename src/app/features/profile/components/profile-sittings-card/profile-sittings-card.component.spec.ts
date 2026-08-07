import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSittingsCardComponent } from './profile-sittings-card.component';

describe('ProfileSittingsCardComponent', () => {
  let component: ProfileSittingsCardComponent;
  let fixture: ComponentFixture<ProfileSittingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSittingsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSittingsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
