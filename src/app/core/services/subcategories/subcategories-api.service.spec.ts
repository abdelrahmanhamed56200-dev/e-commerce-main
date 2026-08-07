import { TestBed } from '@angular/core/testing';

import { SubcategoriesApiService } from './subcategories-api.service';

describe('SubcategoriesApiService', () => {
  let service: SubcategoriesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoriesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
