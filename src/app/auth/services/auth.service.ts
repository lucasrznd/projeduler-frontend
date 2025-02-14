import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { AuthRequest } from 'src/app/models/interfaces/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/auth/AuthResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, authRequest);
  }

  getToken(): string | null {
    const accessToken = this.cookieService.get('accessToken');

    return accessToken;
  }

  isLoggedIn(): boolean {
    // Verificar se possui token
    const token = this.cookieService.get('accessToken');

    return token ? true : false;
  }
}
