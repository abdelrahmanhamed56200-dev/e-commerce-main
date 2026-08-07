import { Routes } from '@angular/router';

export const Cart_Routes: Routes = [
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart-page/cart-page.component').then((m) => m.CartPageComponent),
  },
];
