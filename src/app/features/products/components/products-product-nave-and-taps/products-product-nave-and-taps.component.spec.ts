import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProductNaveAndTapsComponent } from './products-product-nave-and-taps.component';

describe('ProductsProductNaveAndTapsComponent', () => {
  let component: ProductsProductNaveAndTapsComponent;
  let fixture: ComponentFixture<ProductsProductNaveAndTapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsProductNaveAndTapsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsProductNaveAndTapsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
