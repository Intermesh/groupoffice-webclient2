import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts.component';

import {AuthGuard} from '../../shared/services/auth-guard.service';

import {SharedModule} from '../../shared/shared.module';

const contactsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'contacts',
    component: ContactsComponent,
		canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    contactsRouting,
		SharedModule
  ],
  declarations: [
    ContactsComponent
  ],
  providers: []
})
export class ContactsModule {}
