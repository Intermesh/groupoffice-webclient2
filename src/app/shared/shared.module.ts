import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

import {FooterComponent} from './layout/footer.component';
import {HeaderComponent} from './layout/header.component';
import {HttpClientModule} from '@angular/common/http';

import {WysiwygComponent} from './form/input/wysiwyg/wysiwyg.component';

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
		HttpClientModule
			
  ],
  declarations: [
		ShowAuthedDirective,
		ListErrorsComponent,
		SelectionModelToolbar,
		SelectionModelDirective,
		FooterComponent,
		HeaderComponent,
		WysiwygComponent
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
		SelectionModelDirective,
		FooterComponent,
		HeaderComponent,
		WysiwygComponent
  ],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})
export class SharedModule {}
