import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from '../services/localStorage/local-storage.service';
import { isPlatformBrowser } from '@angular/common';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const platform = inject(PLATFORM_ID);
  if (isPlatformBrowser(platform)) {
    const token = localStorageService.getUserToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          token: token,
        },
      });
    }
  }

  return next(req);
};
