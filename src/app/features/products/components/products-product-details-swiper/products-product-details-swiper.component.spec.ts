import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProductDetailsSwiperComponent } from './products-product-details-swiper.component';

describe('ProductsProductDetailsSwiperComponent', () => {
  let component: ProductsProductDetailsSwiperComponent;
  let fixture: ComponentFixture<ProductsProductDetailsSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsProductDetailsSwiperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsProductDetailsSwiperComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
