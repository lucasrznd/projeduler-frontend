import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthRequest } from 'src/app/models/interfaces/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/auth/AuthResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, authRequest);
  }

  getToken(): string | null {
    const accessToken = this.cookieService.get('accessToken');

    return accessToken;
  }

  getRefreshToken(): string | null {
    const refreshToken = this.cookieService.get('refreshToken');

    return refreshToken;
  }

  private storeTokens(response: AuthResponse): void {
    this.cookieService.set('accessToken', response.token);
    this.cookieService.set('refreshToken', response.refreshToken);
  }

  isTokenExpirado(): boolean {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken || !decodedToken.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      this.logout();
    }

    return this.http.post<AuthResponse>(`${this.API_URL}/auth/refresh-token`, { refreshToken })
      .pipe(
        tap(response => this.storeTokens(response)),
        map(response => response.token),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (err) {
      return null;
    }
  }

  getUserRoles(): string[] {
    const decodedToken = this.getDecodedToken();
    return [decodedToken?.role];
  }

  hasRole(requiredRoles: string[]): boolean {
    const userRoles = this.getUserRoles();
    return requiredRoles.some(role => userRoles.includes(role));
  }

  isLoggedIn(): boolean {
    // Verificar se possui token
    const token = this.cookieService.get('accessToken');

    return token ? true : false;
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
