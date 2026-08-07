import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProductImageSwiperSkeletonComponent } from './products-product-image-swiper-skeleton.component';

describe('ProductsProductImageSwiperSkeletonComponent', () => {
  let component: ProductsProductImageSwiperSkeletonComponent;
  let fixture: ComponentFixture<ProductsProductImageSwiperSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsProductImageSwiperSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsProductImageSwiperSkeletonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
