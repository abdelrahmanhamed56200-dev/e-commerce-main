import { Component, computed, input, output, signal } from '@angular/core';
import { ProductsProductShippingAndReturnsTapComponent } from '../products-product-shipping-and-returns-tap/products-product-shipping-and-returns-tap.component';
import { ProductsProductReviewsTapComponent } from '../products-product-reviews-tap/products-product-reviews-tap.component';
import { IReview } from '../../../../core/models/product.interface';
import { ProductsProductProfileTapComponent } from '../products-product-profile-tap/products-product-profile-tap.component';

@Component({
  selector: 'app-products-product-nave-and-taps',
  imports: [
    ProductsProductShippingAndReturnsTapComponent,
    ProductsProductReviewsTapComponent,
    ProductsProductProfileTapComponent,
  ],
  templateUrl: './products-product-nave-and-taps.component.html',
  styleUrl: './products-product-nave-and-taps.component.css',
})
export class ProductsProductNaveAndTapsComponent {
  ratingsAverage = input.required<number>();
  ratingsQuantity = input.required<number>();
  category = input.required<string>();
  subcategory = input.required<string>();
  brand = input.required<string>();
  sold = input.required<number>();
  productId = input.required<string>();
  allReviews = input.required<IReview[]>();

  activeBtnNum = signal<number>(1);
  activeTapNum = computed(() => this.activeBtnNum());

  onSelectTap(tapNum: number) {
    this.activeBtnNum.set(tapNum);
  }
}
