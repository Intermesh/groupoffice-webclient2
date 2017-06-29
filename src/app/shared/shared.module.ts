import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ShowAuthedDirective } from './show-authed.directive';
import {ListErrorsComponent} from './list-errors.component';

import {MaterialModule} from './material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
		MaterialModule
  ],
  declarations: [
		ShowAuthedDirective,
		ListErrorsComponent
	],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
		ShowAuthedDirective,
		ListErrorsComponent,
		MaterialModule
  ]
})
export class SharedModule {}
