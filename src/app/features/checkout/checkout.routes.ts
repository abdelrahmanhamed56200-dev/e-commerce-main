import { Routes } from '@angular/router';

export const Checkout_Routes: Routes = [
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout-page/checkout-page.component').then((m) => m.CheckoutPageComponent),
  },
];
