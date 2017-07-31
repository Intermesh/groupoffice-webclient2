import {NgModule} from '@angular/core';

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
	MdAutocompleteModule,
	MdSnackBarModule,
	MdSnackBar,
	MdTableModule,
	MdPaginatorModule,
	MdCheckboxModule,
	MdSortModule,
	MdSidenavModule,
	MdDatepickerModule,
	MdNativeDateModule,
	MdSelectModule
} from '@angular/material';

import {CdkTableModule} from '@angular/cdk';

let materialModules: any[] = [
	CdkTableModule,
	
	MdToolbarModule,
	MdCardModule,
	MdInputModule,
	MdListModule,
	MdIconModule,
	MdTabsModule,
	MdButtonModule,
	MdMenuModule,
	MdDialogModule,
	MdAutocompleteModule,
	MdSnackBarModule,
	MdTableModule,
	MdPaginatorModule,
	MdCheckboxModule,
	MdSortModule,
	MdSidenavModule,
	MdDatepickerModule,
	MdNativeDateModule,
	MdSelectModule
];

@NgModule({
	imports: materialModules,
	exports: materialModules,
	providers: [
		MdDialog,
		MdSnackBar,
	]
})
export class MaterialModule {}