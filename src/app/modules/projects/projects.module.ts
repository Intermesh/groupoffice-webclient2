import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ProjectsComponent} from './projects.component';
import {ProjectsTableComponent} from './projects-table.component';
import {ProjectsListComponent} from './projects-list.component';

import {AuthGuard} from '../../shared/services/auth-guard.service';

import {SharedModule} from '../../shared/shared.module';

import {ProjectService} from './services/project.service';
import {ProjectEditorService} from './services/project-editor.service';

import {ProjectEditDialog} from './project-edit-dialog.component';


import {ContactsModule} from '../contacts/contacts.module';
import {ProjectComponent} from './project.component';
import {DragulaModule} from 'ng2-dragula';
//import {DndModule} from 'ng2-dnd';

const projectsRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: 'projects',
		component: ProjectsComponent,
		canActivate: [AuthGuard],
		children: [{
			path: ':id',
			component: ProjectComponent,
			canActivate: [AuthGuard]
		}			
		]
	}, 
]);

@NgModule({
	imports: [
		ContactsModule,
		projectsRouting,
		SharedModule,
		DragulaModule,
//		DndModule
	],
	declarations: [
		ProjectsComponent,
		ProjectsTableComponent,
		ProjectsListComponent,
		ProjectEditDialog,
		ProjectComponent
	],
	providers: [
		ProjectService,
		ProjectEditorService
	],
	entryComponents: [
		ProjectEditDialog
	],
})
export class ProjectsModule {}
