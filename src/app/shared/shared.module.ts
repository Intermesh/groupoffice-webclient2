import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ShowAuthedDirective } from './show-authed.directive';
import {ListErrorsComponent} from './list-errors.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MaterialModule} from './material.module';
import {CovalentSearchModule} from '@covalent/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
		MaterialModule,
		FlexLayoutModule,
		CovalentSearchModule
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
		MaterialModule,
		FlexLayoutModule,
		CovalentSearchModule
  ]
})
export class SharedModule {}
