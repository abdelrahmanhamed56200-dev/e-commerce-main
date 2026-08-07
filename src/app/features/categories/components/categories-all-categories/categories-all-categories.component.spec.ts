import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAllCategoriesComponent } from './categories-all-categories.component';

describe('CategoriesAllCategoriesComponent', () => {
  let component: CategoriesAllCategoriesComponent;
  let fixture: ComponentFixture<CategoriesAllCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesAllCategoriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesAllCategoriesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
