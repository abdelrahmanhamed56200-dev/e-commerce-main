import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesPageComponent } from './subcategories-page.component';

describe('SubcategoriesPageComponent', () => {
  let component: SubcategoriesPageComponent;
  let fixture: ComponentFixture<SubcategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoriesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubcategoriesPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
