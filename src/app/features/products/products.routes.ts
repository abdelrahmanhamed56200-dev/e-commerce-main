import { Routes } from '@angular/router';

export const Products_Routes: Routes = [
  {
    path: 'products/:id/:slug',
    loadComponent: () =>
      import('./pages/product-details-page/product-details-page.component').then(
        (m) => m.ProductDetailsPageComponent,
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/all-products-page/all-products-page.component').then(
        (m) => m.AllProductsPageComponent,
      ),
  },
];
