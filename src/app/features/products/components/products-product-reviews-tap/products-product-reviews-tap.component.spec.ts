import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProductReviewsTapComponent } from './products-product-reviews-tap.component';

describe('ProductsProductReviewsTapComponent', () => {
  let component: ProductsProductReviewsTapComponent;
  let fixture: ComponentFixture<ProductsProductReviewsTapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsProductReviewsTapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsProductReviewsTapComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
