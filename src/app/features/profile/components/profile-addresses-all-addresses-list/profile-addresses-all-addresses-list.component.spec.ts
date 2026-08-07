import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddressesAllAddressesListComponent } from './profile-addresses-all-addresses-list.component';

describe('ProfileAddressesAllAddressesListComponent', () => {
  let component: ProfileAddressesAllAddressesListComponent;
  let fixture: ComponentFixture<ProfileAddressesAllAddressesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAddressesAllAddressesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileAddressesAllAddressesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
