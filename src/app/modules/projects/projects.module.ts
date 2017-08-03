import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ProjectResolve} from './project.resolve';
import {ProjectsComponent} from './projects.component';
import {ProjectInfoComponent} from './project-info.component';
import {ProjectProposalComponent} from './project-proposal.component';
import {ProjectsTableComponent} from './projects-table.component';
import {ProjectsListComponent} from './projects-list.component';

import {AuthGuard} from '../../shared/services/auth-guard.service';

import {SharedModule} from '../../shared/shared.module';

import {ProjectService} from './services/project.service';
import {ProjectEditorService} from './services/project-editor.service';

import {ProjectEditDialog} from './project-edit-dialog.component';
import {ProjectProposalEditDialog} from './project-proposal-edit-dialog.component';

import {ContactsModule} from '../contacts/contacts.module';
import {ProjectComponent} from './project.component';
import {DragulaModule} from 'ng2-dragula';
import { ProjectTeamComponent } from './project-team.component';
import { ProjectIssuesComponent } from './project-issues.component';
import { IssueEditDialogComponent } from './issue-edit-dialog.component';
import {IssueEditorService} from './services/issue-editor.service';
import { IssueComponent } from './issue.component';
import {IssueResolve} from './issue.resolve';
//import {DndModule} from 'ng2-dnd';

const projectsRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: 'projects',
		component: ProjectsComponent,
		canActivate: [AuthGuard],
		children: [{
			path: ':id',
			component: ProjectComponent,
			canActivate: [AuthGuard],
			resolve: {
				project: ProjectResolve
			},
			children: [
				{
					path: 'info',
					component: ProjectInfoComponent
				},{
					path: 'proposal',
					component: ProjectProposalComponent
				},{
					path: 'team',
					component: ProjectTeamComponent
				},{
					path: 'issues',
					component: ProjectIssuesComponent
				},{
					path: 'issues/:id',
					component: IssueComponent,
					resolve: {
						issue: IssueResolve
					}
				}		
				
			]
		},
		
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
		ProjectComponent,
		ProjectInfoComponent,
		ProjectProposalComponent,
		ProjectProposalEditDialog,
		ProjectTeamComponent,
		ProjectIssuesComponent,
		IssueEditDialogComponent,
		IssueComponent
	],
	providers: [
		ProjectService,
		ProjectEditorService,
		IssueEditorService,
		ProjectResolve,
		IssueResolve
	],
	entryComponents: [
		ProjectEditDialog,
		ProjectProposalEditDialog,
		IssueEditDialogComponent
	],
})
export class ProjectsModule {}
