import { Routes } from '@angular/router';

export const Categories_Routes: Routes = [
  {
    path: 'categories/:categoryId',
    loadComponent: () =>
      import('./pages/subcategories-page/subcategories-page.component').then(
        (m) => m.SubcategoriesPageComponent,
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories-page/categories-page.component').then(
        (m) => m.CategoriesPageComponent,
      ),
  },
];
