import { BrowserModule ,	Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {AuthModule} from './auth/auth.module';

import {ApiService} from './shared/services/api.service'
import {UserService} from './shared/services/user.service'
import {AuthGuard} from './shared/services/auth-guard.service'
import {AccessTokenService} from './shared/services/access-token.service'


import {SharedModule} from './shared/shared.module';


import {DndModule} from 'ng2-dnd';

/** modules **/

import {ProjectsModule} from './modules/projects/projects.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

	
		//angular core
		FormsModule,
    BrowserModule,
		BrowserAnimationsModule,
		
		AppRoutingModule,
		AuthModule,
		
		SharedModule,

		
		DndModule.forRoot(),
		
		//Modules
		ProjectsModule

	
		
		
  ],
  providers: [
		ApiService,
		AuthGuard,
		AccessTokenService,
		UserService,
		Title
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
