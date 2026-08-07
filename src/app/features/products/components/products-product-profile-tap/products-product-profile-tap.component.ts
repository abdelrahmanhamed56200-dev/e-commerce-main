import { Component, input } from '@angular/core';

@Component({
  selector: 'app-products-product-profile-tap',
  imports: [],
  templateUrl: './products-product-profile-tap.component.html',
  styleUrl: './products-product-profile-tap.component.css',
})
export class ProductsProductProfileTapComponent {
  category = input.required<string>();
  subcategory = input.required<string>();
  brand = input.required<string>();
  sold = input.required<number>();
}
