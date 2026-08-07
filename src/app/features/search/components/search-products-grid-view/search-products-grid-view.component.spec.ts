import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductsGridViewComponent } from './search-products-grid-view.component';

describe('SearchProductsGridViewComponent', () => {
  let component: SearchProductsGridViewComponent;
  let fixture: ComponentFixture<SearchProductsGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProductsGridViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchProductsGridViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
