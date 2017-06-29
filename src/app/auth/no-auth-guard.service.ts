
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import {UserService} from '../shared/services/user.service';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    // i.e. if isAuthenticated is false, then set canActivate to true
    return this.userService.isAuthenticated.take(1).map(bool => !bool);

  }
}