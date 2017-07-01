import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ProjectsTableComponent } from './projects-table.component';
import {ProjectEditDialog} from './project-edit-dialog.component';
import {AuthGuard} from '../../shared/services/auth-guard.service';

import {SharedModule} from '../../shared/shared.module';
import {MdDialog} from '@angular/material';

import { CovalentDataTableModule } from '@covalent/core';
import {ProjectService} from './services/project.service';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {ContactsModule} from '../contacts/contacts.module';


const projectsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'projects',
    component: ProjectsComponent,
		canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
	ContactsModule,
    projectsRouting,
		SharedModule,
		CovalentDataTableModule,
		InfiniteScrollModule
  ],
  declarations: [
    ProjectsComponent,
		ProjectsTableComponent,
		ProjectEditDialog
  ],
  providers: [
		ProjectService
	],
	entryComponents: [
		ProjectEditDialog
	]
})
export class ProjectsModule {}
