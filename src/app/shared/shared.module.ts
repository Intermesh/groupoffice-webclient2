import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ShowAuthedDirective } from './show-authed.directive';
import {ListErrorsComponent} from './list-errors.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MaterialModule} from './material.module';

import {SelectionModelToolbar} from './selection-model/selection-model-toolbar.component';
import {SelectionModelDirective} from './selection-model/selection-model.directive';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
		MaterialModule,
		FlexLayoutModule,
		InfiniteScrollModule,
		
  ],
  declarations: [
		ShowAuthedDirective,
		ListErrorsComponent,
		SelectionModelToolbar,
		SelectionModelDirective
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
		InfiniteScrollModule,
		SelectionModelToolbar,
		SelectionModelDirective
  ]
})
export class SharedModule {}
