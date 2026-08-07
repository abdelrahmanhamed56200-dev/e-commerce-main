import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingProductsComponent } from './loading-products.component';

describe('LoadingProductsComponent', () => {
  let component: LoadingProductsComponent;
  let fixture: ComponentFixture<LoadingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingProductsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
