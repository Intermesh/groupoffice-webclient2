import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import {Errors} from '../shared/models/errors.model';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
//  authType: String = '';
//  title: String = '';
  isSubmitting: boolean = false;
  authForm: FormGroup;
	errors: Errors = new Errors();

  constructor(
    private route: ActivatedRoute,
		private router: Router,
	  private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
//      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
//      this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';
    
    });
  }

  submitForm() {
    this.isSubmitting = true;
		this.errors = new Errors();
		

    let credentials = this.authForm.value;
    // check out what you get!
//    console.log(credentials);
		
		var loginObservable = this.userService.login(credentials);
   
		 loginObservable.subscribe(data => {			
				console.log(data);
				this.router.navigateByUrl('/contacts');
				
		},
      err => {
				console.log(err);
       this.errors = err;
       this.isSubmitting = false;
      }
    );
  }
}
