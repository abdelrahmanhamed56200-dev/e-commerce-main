import { Routes } from '@angular/router';

export const Profile_Routes: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then((m) => m.ProfilePageComponent),

    children: [
      {
        path: '',
        redirectTo: 'addresses',
        pathMatch: 'full',
      },
      {
        path: 'addresses',
        loadComponent: () =>
          import('./pages/profile-addresses-page/profile-addresses-page.component').then(
            (m) => m.ProfileAddressesPageComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/profile-settings-page/profile-settings-page.component').then(
            (m) => m.ProfileSettingsPageComponent,
          ),
      },
    ],
  },
];
