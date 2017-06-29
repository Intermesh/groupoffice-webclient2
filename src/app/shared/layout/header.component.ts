import { Component, OnInit } from '@angular/core';

import {User} from '../models/user.model';
import {UserService} from '../services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
		private router: Router
  ) {}

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
  }
	
	logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/login');
  }
 }