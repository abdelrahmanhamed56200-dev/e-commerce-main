import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProductInfoComponent } from './products-product-info.component';

describe('ProductsProductInfoComponent', () => {
  let component: ProductsProductInfoComponent;
  let fixture: ComponentFixture<ProductsProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsProductInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsProductInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
