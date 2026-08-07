import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSkeletonCategoryCardComponent } from './categories-skeleton-category-card.component';

describe('CategoriesSkeletonCategoryCardComponent', () => {
  let component: CategoriesSkeletonCategoryCardComponent;
  let fixture: ComponentFixture<CategoriesSkeletonCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesSkeletonCategoryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesSkeletonCategoryCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
