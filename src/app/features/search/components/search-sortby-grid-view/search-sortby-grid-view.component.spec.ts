import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSortbyGridViewComponent } from './search-sortby-grid-view.component';

describe('SearchSortbyGridViewComponent', () => {
  let component: SearchSortbyGridViewComponent;
  let fixture: ComponentFixture<SearchSortbyGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSortbyGridViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchSortbyGridViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
