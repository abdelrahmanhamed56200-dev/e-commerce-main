import { Component, input } from '@angular/core';
import { IProduct } from '../../../../core/models/product.interface';
import { ProductCardComponent } from '../../../../shared/ui/product-card/product-card.component';

@Component({
  selector: 'app-products-all-products',
  imports: [ProductCardComponent],
  templateUrl: './products-all-products.component.html',
  styleUrl: './products-all-products.component.css',
})
export class ProductsAllProductsComponent {
  products = input.required<IProduct[]>();
  isLoading = input.required<boolean>();
}
