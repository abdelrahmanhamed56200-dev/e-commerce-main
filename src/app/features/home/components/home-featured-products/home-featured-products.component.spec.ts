import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturedProductsComponent } from './home-featured-products.component';

describe('HomeFeaturedProductsComponent', () => {
  let component: HomeFeaturedProductsComponent;
  let fixture: ComponentFixture<HomeFeaturedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturedProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFeaturedProductsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
