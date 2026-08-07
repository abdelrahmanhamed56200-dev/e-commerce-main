import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersSidebarComponent } from './search-filters-sidebar.component';

describe('SearchFiltersSidebarComponent', () => {
  let component: SearchFiltersSidebarComponent;
  let fixture: ComponentFixture<SearchFiltersSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFiltersSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFiltersSidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
