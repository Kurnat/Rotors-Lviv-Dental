import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthLoginService } from '../services/admin-login.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
  constructor(
          private authLoginService: AuthLoginService,
          private router: Router
          ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authLoginService.isAuthenticated().then(isAuth => {
      if (isAuth) {
        return true;
      } else {
        this.router.navigate(['/admin-login'], {
          queryParams: {
            auth: false
          }
        });
      }
    });
  }
}
