import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalSecurity implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('role') === 'ROLE_MANTENANCE' && sessionStorage.getItem('token')) {
      return true;
    }
    sessionStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
