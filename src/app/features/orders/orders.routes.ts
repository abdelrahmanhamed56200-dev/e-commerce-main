import { Routes } from '@angular/router';

export const Orders_Routes: Routes = [
  {
    path: 'allorders',
    loadComponent: () =>
      import('./pages/orders-page/orders-page.component').then((m) => m.OrdersPageComponent),
  },
];
