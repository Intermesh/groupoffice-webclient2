import {ModuleWithProviders, NgModule} from '@angular/core';
//import { RouterModule } from '@angular/router';
//
//import { ContactsComponent } from './contacts.component';
//import { ContactsTableComponent } from './contacts-table.component';
//import {ContactEditDialog} from './contact-edit-dialog.component';
import {AuthGuard} from '../../shared/services/auth-guard.service';

import {SharedModule} from '../../shared/shared.module';

import {ContactAutocompleteComponent} from './contact-autocomplete.component';

//const contactsRouting: ModuleWithProviders = RouterModule.forChild([
//  {
//    path: 'contacts',
//    component: ContactsComponent,
//		canActivate: [AuthGuard]
//  }
//]);

@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [
		ContactAutocompleteComponent
	],
	exports: [
	ContactAutocompleteComponent
	]
})
export class ContactsModule {}
