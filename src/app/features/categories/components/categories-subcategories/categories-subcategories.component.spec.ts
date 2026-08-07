import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSubcategoriesComponent } from './categories-subcategories.component';

describe('CategoriesSubcategoriesComponent', () => {
  let component: CategoriesSubcategoriesComponent;
  let fixture: ComponentFixture<CategoriesSubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesSubcategoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesSubcategoriesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
