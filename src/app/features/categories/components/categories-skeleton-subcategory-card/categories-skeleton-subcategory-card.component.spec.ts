import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSkeletonSubcategoryCardComponent } from './categories-skeleton-subcategory-card.component';

describe('CategoriesSkeletonSubcategoryCardComponent', () => {
  let component: CategoriesSkeletonSubcategoryCardComponent;
  let fixture: ComponentFixture<CategoriesSkeletonSubcategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesSkeletonSubcategoryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesSkeletonSubcategoryCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
