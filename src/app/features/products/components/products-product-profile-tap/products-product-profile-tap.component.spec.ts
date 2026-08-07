import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProductProfileTapComponent } from './products-product-profile-tap.component';

describe('ProductsProductProfileTapComponent', () => {
  let component: ProductsProductProfileTapComponent;
  let fixture: ComponentFixture<ProductsProductProfileTapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsProductProfileTapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsProductProfileTapComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
