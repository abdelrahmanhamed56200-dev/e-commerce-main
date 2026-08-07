import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategorySectionComponent } from './home-category-section.component';

describe('HomeCategorySectionComponent', () => {
  let component: HomeCategorySectionComponent;
  let fixture: ComponentFixture<HomeCategorySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCategorySectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCategorySectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
