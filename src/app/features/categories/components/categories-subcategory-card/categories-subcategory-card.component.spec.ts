import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSubcategoryCardComponent } from './categories-subcategory-card.component';

describe('CategoriesSubcategoryCardComponent', () => {
  let component: CategoriesSubcategoryCardComponent;
  let fixture: ComponentFixture<CategoriesSubcategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesSubcategoryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesSubcategoryCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
