import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoryCardComponent } from './home-category-card.component';

describe('HomeCategoryCardComponent', () => {
  let component: HomeCategoryCardComponent;
  let fixture: ComponentFixture<HomeCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCategoryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCategoryCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
