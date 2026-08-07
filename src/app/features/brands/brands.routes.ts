import { Routes } from '@angular/router';

export const Brands_Routes: Routes = [
  {
    path: 'brands',
    loadComponent: () =>
      import('./pages/brands-page/brands-page.component').then((m) => m.BrandsPageComponent),
  },
];
