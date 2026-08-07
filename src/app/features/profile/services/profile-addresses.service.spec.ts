import { TestBed } from '@angular/core/testing';

import { ProfileAddressesService } from './profile-addresses.service';

describe('ProfileAddressesService', () => {
  let service: ProfileAddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileAddressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
