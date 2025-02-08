import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
