import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-products',
  imports: [],
  templateUrl: './loading-products.component.html',
  styleUrl: './loading-products.component.css',
})
export class LoadingProductsComponent {
  isLoading = input.required<boolean>();
}
