import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  /**
   * Constructor
   * @param authService: authentication service
   * @param router
   * @param cookieService: browser cookie store
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  /**
   * Can activate
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Set return URL
    this.authService.returnUrl = route.routeConfig.path;
    // Get user cookie
    const userCookie = this.cookieService.get('WD_GUID');
    // If user cookie is set and not empty, allow in route
    if (userCookie && userCookie !== '') {
      return true;
    } else {
      // Else route to auth flow
      this.router.navigate(['/auth/login']);
    }
  }

}
