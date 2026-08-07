import { Routes } from '@angular/router';

export const Wishlist_Routes: Routes = [
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./pages/wishlist-page/wishlist-page.component').then((m) => m.WishlistPageComponent),
  },
];
