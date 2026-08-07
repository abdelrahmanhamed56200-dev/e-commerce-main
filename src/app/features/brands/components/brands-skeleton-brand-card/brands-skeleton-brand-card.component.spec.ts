import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsSkeletonBrandCardComponent } from './brands-skeleton-brand-card.component';

describe('BrandsSkeletonBrandCardComponent', () => {
  let component: BrandsSkeletonBrandCardComponent;
  let fixture: ComponentFixture<BrandsSkeletonBrandCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsSkeletonBrandCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandsSkeletonBrandCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
