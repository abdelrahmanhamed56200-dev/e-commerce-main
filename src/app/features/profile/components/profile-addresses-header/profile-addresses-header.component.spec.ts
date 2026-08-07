import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddressesHeaderComponent } from './profile-addresses-header.component';

describe('ProfileAddressesHeaderComponent', () => {
  let component: ProfileAddressesHeaderComponent;
  let fixture: ComponentFixture<ProfileAddressesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAddressesHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileAddressesHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
