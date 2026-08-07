import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAllProductsComponent } from './products-all-products.component';

describe('ProductsAllProductsComponent', () => {
  let component: ProductsAllProductsComponent;
  let fixture: ComponentFixture<ProductsAllProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAllProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsAllProductsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
