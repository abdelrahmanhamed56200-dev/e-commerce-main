import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProductShippingAndReturnsTapComponent } from './products-product-shipping-and-returns-tap.component';

describe('ProductsProductShippingAndReturnsTapComponent', () => {
  let component: ProductsProductShippingAndReturnsTapComponent;
  let fixture: ComponentFixture<ProductsProductShippingAndReturnsTapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsProductShippingAndReturnsTapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsProductShippingAndReturnsTapComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
