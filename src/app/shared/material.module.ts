import { NgModule } from '@angular/core';

import {
MdToolbarModule, 
MdCardModule, 
MdInputModule, 
MdListModule, 
MdIconModule, 
MdButtonModule, 
MdMenuModule,
MdTabsModule,
MdDialog,
MdDialogModule,
MdAutocompleteModule
} from '@angular/material';

let materialModules: any[] = 	[
		MdToolbarModule,
		MdCardModule,
		MdInputModule,
		MdListModule,
		MdIconModule,
		MdTabsModule,
		MdButtonModule,
		MdMenuModule,
		MdDialogModule,
		MdAutocompleteModule
		];

@NgModule({
  imports: materialModules,
  exports: materialModules,
	providers: [
		MdDialog
	]
})
export class MaterialModule { }