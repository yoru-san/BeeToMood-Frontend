import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/shared/user';

@Injectable()
export class FirstConnexionGuard implements CanActivate {
  constructor(private router: Router) {}
  private user: User;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this.user = JSON.parse(sessionStorage.getItem('user'));
      if (this.user.firstConnection == true)
      return true;

      this.router.navigate(['/']);
      return false;   
  }
}
