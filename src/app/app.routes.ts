import { Routes } from '@angular/router';
import { Home_Routes } from './features/home/home.routes';
import { Auth_Routes } from './features/auth/auth.routes';
import { Cart_Routes } from './features/cart/cart.routes';
import { guestGuard } from './core/guard/guest/guest.guard';
import { loggedGuard } from './core/guard/logged/logged.guard';
import { Orders_Routes } from './features/orders/orders.routes';
import { Search_Routes } from './features/search/search.routes';
import { Brands_Routes } from './features/brands/brands.routes';
import { Profile_Routes } from './features/profile/profile.routes';
import { Contact_Routes } from './features/contact/contact.routes';
import { Products_Routes } from './features/products/products.routes';
import { Wishlist_Routes } from './features/wishlist/wishlist.routes';
import { Checkout_Routes } from './features/checkout/checkout.routes';
import { Categories_Routes } from './features/categories/categories.routes';

export const routes: Routes = [
  // gust
  {
    path: '',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./layout/guest-layout/guest-layout.component').then((m) => m.GuestLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        children: Home_Routes,
      },
      {
        path: '',
        pathMatch: 'prefix',
        children: Search_Routes,
      },
      {
        path: '',
        pathMatch: 'prefix',
        children: Categories_Routes,
      },
      {
        path: '',
        pathMatch: 'prefix',
        children: Products_Routes,
      },
      {
        path: '',
        pathMatch: 'prefix',
        children: Brands_Routes,
      },
      {
        path: '',
        pathMatch: 'prefix',
        children: Wishlist_Routes,
      },
      {
        path: '',
        pathMatch: 'prefix',
        children: Cart_Routes,
      },
      {
        path: '',
        pathMatch: 'prefix',
        children: Contact_Routes,
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./features/static/privacy-policy-page/privacy-policy-page.component').then(
            (m) => m.PrivacyPolicyPageComponent,
          ),
      },
      {
        path: 'terms',
        loadComponent: () =>
          import('./features/static/terms-and-conditions-page/terms-and-conditions-page.component').then(
            (m) => m.TermsAndConditionsPageComponent,
          ),
      },
    ],
  },

  // user
  {
    path: '',
    pathMatch: 'prefix',
    canActivate: [loggedGuard],
    loadComponent: () =>
      import('./layout/user-layout/user-layout.component').then((m) => m.UserLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        children: Profile_Routes,
      },
      {
        path: '',
        pathMatch: 'prefix',
        children: Checkout_Routes,
      },
      {
        path: '',
        pathMatch: 'prefix',
        children: Orders_Routes,
      },
    ],
  },

  // auth
  {
    path: '',
    pathMatch: 'prefix',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: Auth_Routes,
  },

  {
    path: 'notFound',
    loadComponent: () =>
      import('./features/static/notfound-page/notfound-page.component').then(
        (m) => m.NotfoundPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'notFound',
  },
];
