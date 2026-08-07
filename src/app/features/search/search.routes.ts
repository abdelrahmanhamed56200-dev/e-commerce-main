import { Routes } from '@angular/router';

export const Search_Routes: Routes = [
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search-page/search-page.component').then((m) => m.SearchPageComponent),
  },
];
