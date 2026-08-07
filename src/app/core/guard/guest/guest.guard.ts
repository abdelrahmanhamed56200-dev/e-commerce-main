import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platform = inject(PLATFORM_ID);
  const localStorageService = inject(LocalStorageService);

  if (isPlatformBrowser(platform)) {
    const token = localStorageService.getUserToken();
    if (token) {
      return router.createUrlTree(['/']);
    } else return true;
  }
  return true;
};
