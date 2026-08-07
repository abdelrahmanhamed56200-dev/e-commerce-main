import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddressesPageComponent } from './profile-addresses-page.component';

describe('ProfileAddressesPageComponent', () => {
  let component: ProfileAddressesPageComponent;
  let fixture: ComponentFixture<ProfileAddressesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAddressesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileAddressesPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
