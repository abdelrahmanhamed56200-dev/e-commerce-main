import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersDrawerComponent } from './search-filters-drawer.component';

describe('SearchFiltersDrawerComponent', () => {
  let component: SearchFiltersDrawerComponent;
  let fixture: ComponentFixture<SearchFiltersDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFiltersDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFiltersDrawerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
