import { TestBed } from '@angular/core/testing';

import { AddressModalService } from './address-modal.service';

describe('AddressModalService', () => {
  let service: AddressModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
