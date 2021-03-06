import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IsAllowedGuard implements CanActivate {
  constructor(private router: Router) {}
  private allowedUser;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // Si l'utilisateur connecté est un Manager ou un Admin, il peut accéder à cette route
      this.allowedUser = JSON.parse(sessionStorage.getItem('user'));
      if (this.allowedUser.type == "Manager" ||this.allowedUser.type == "Admin")
        return true;
      
        this.router.navigate(['/']);
        return false;
  }
}
