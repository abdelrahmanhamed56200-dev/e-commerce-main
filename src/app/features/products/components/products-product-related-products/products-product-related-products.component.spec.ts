import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProductRelatedProductsComponent } from './products-product-related-products.component';

describe('ProductsProductRelatedProductsComponent', () => {
  let component: ProductsProductRelatedProductsComponent;
  let fixture: ComponentFixture<ProductsProductRelatedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsProductRelatedProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsProductRelatedProductsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
