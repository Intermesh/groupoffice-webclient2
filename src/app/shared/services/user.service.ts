import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { AccessTokenService } from './access-token.service';
import {User} from '../models/user.model';
import {CrudService} from './crud.service';

@Injectable()
export class UserService extends CrudService<User> {
	protected getStorePath(): string {
		return "/auth/users";
	}
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    apiService: ApiService,
    private accessTokenService: AccessTokenService
  ) {
		super(apiService, User);	
	}
	
	// Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.

  populate() {

    // If JWT detected, attempt to get & store user's info

    if (this.accessTokenService.getToken()) {
      // utilize our newly created get() method (params are optional)
      this.apiService.get('/auth')
      .subscribe(
        data => this.setAuth(data.data),
        err => this.purgeAuth()
      );
    } else {

      // Remove any potential remnants of previous auth states

      this.purgeAuth();
    }
  }

  setAuth(token) {
		
		// Save JWT sent from server in localstorage
    this.accessTokenService.saveToken(token.accessToken);
    // Set current user data into observable
    this.currentUserSubject.next(token.user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
		
		
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.accessTokenService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
		
		this.apiService.delete('/auth');
  }

  login(credentials): Observable<User> {
    return this.apiService.post('/auth', {data: credentials})
    .map(
      data => {
        this.setAuth(data.data);
        return data;
      }
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}
