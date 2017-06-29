import { NgModule } from '@angular/core';

import {
MdToolbarModule, 
MdCardModule, 
MdInputModule, 
MdListModule, 
MdIconModule, 
MdButtonModule, 
MdMenuModule,
MdTabsModule
} from '@angular/material';

let materialModules: any[] = 	[
		MdToolbarModule,
		MdCardModule,
		MdInputModule,
		MdListModule,
		MdIconModule,
		MdTabsModule,
		MdButtonModule,
		MdMenuModule
		];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule { }