import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSittingsHeaderComponent } from './profile-sittings-header.component';

describe('ProfileSittingsHeaderComponent', () => {
  let component: ProfileSittingsHeaderComponent;
  let fixture: ComponentFixture<ProfileSittingsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSittingsHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSittingsHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
