import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProductDetailsInfoSkeletonComponent } from './products-product-details-info-skeleton.component';

describe('ProductsProductDetailsInfoSkeletonComponent', () => {
  let component: ProductsProductDetailsInfoSkeletonComponent;
  let fixture: ComponentFixture<ProductsProductDetailsInfoSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsProductDetailsInfoSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsProductDetailsInfoSkeletonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
