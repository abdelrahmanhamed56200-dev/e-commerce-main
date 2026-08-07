import { Component, input, output } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/ui/product-card/product-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { IProduct } from '../../../../core/models/product.interface';
import { IDisplayType } from '../../interfaces/search-types';

@Component({
  selector: 'app-search-products-grid-view',
  imports: [ProductCardComponent, NgxPaginationModule],
  templateUrl: './search-products-grid-view.component.html',
  styleUrl: './search-products-grid-view.component.css',
})
export class SearchProductsGridViewComponent {
  products = input.required<IProduct[]>();
  currentPage = input.required<number>();
  totalProducts = input.required<number>();
  displayMode = input.required<IDisplayType>();
  isShow = input.required<boolean>();

  onChangPage = output<number>();

  changPage(page: number) {
    this.onChangPage.emit(page);
  }
}
