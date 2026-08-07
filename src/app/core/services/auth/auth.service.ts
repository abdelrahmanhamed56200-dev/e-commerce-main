import { effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/user-res.interface';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly authApiService = inject(AuthApiService);

  isLogged = signal<boolean>(false);
  userID = signal<string>('');
  user = signal<IUser | null>(null);

  constructor() {
    this.checkVerifyToken();
  }

  checkVerifyToken() {
    this.authApiService.verifyToken().subscribe({
      next: (res) => {
        if (res.message === 'verified') {
          this.isLogged.set(true);
          this.userID.set(res.decoded.id);

          this.user.set(this.localStorageService.getUserData());
        } else {
          this.localStorageService.removeUser();
        }
      },
      error: () => this.localStorageService.removeUser(),
    });
  }
  logOut(redirectTo?: string) {
    this.isLogged.set(false);
    this.localStorageService.removeUser();
    this.router.navigate(['/login'], { queryParams: { redirectTo: redirectTo } });
  }
}
