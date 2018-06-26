import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IsLoggedGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // Si l'utilisateur est connecté, il peut accéder à cette route
      if (!sessionStorage.getItem('user'))
        return true;

      this.router.navigate(['/', 'login']);
      return false;
  }
}
