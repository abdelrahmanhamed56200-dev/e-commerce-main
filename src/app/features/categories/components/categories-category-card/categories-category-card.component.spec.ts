import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCategoryCardComponent } from './categories-category-card.component';

describe('CategoriesCategoryCardComponent', () => {
  let component: CategoriesCategoryCardComponent;
  let fixture: ComponentFixture<CategoriesCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesCategoryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesCategoryCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
