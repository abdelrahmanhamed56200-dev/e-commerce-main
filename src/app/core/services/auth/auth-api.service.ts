import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_APIS } from '../../constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly httpClient = inject(HttpClient);

  signup(user: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
    terms: boolean;
  }): Observable<any> {
    return this.httpClient.post(APP_APIS.auth.signup, user);
  }
  signin(user: { email: string; password: string; rememberMe: string }): Observable<any> {
    return this.httpClient.post(APP_APIS.auth.signin, user);
  }

  forgotPasswords(email: string): Observable<any> {
    return this.httpClient.post(APP_APIS.auth.forgotPasswords, { email: email });
  }
  verifyResetCode(resetCode: string): Observable<any> {
    return this.httpClient.post(APP_APIS.auth.verifyResetCode, { resetCode: resetCode });
  }
  resetPassword(data: { email: string; newPassword: string }): Observable<any> {
    return this.httpClient.put(APP_APIS.auth.resetPassword, data);
  }

  changeMyPassword(passwords: {
    currentPassword: string;
    password: string;
    rePassword: string;
  }): Observable<any> {
    return this.httpClient.put(APP_APIS.auth.changeMyPassword, passwords);
  }

  updateLoggedUserData(data: { name: string; email: string; phone: string }): Observable<any> {
    return this.httpClient.put(APP_APIS.auth.updateMe, data);
  }

  getAllUsers(filters?: { keyword?: string; limit?: number; page?: number }): Observable<any> {
    const params = new HttpParams({ fromObject: filters });
    return this.httpClient.get(APP_APIS.auth.users, { params: params });
  }
  verifyToken(): Observable<any> {
    return this.httpClient.get(APP_APIS.auth.verifyToken);
  }
}
