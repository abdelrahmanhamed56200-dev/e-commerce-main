import { Component, input } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/ui/product-card/product-card.component';
import { HomeSectionTitleComponent } from '../home-section-title/home-section-title.component';
import { IProduct } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-home-featured-products',
  imports: [ProductCardComponent, HomeSectionTitleComponent],
  templateUrl: './home-featured-products.component.html',
  styleUrl: './home-featured-products.component.css',
})
export class HomeFeaturedProductsComponent {
  products = input.required<IProduct[]>();
}
