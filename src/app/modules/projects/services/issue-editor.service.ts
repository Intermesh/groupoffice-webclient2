import {Injectable} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Router } from '@angular/router';
import {Issue} from '../models/issue.model';
import {Project} from '../models/project.model';
import {IssueEditDialogComponent} from '../issue-edit-dialog.component';

@Injectable()
export class IssueEditorService {
	
	constructor(private dialog: MdDialog, private router: Router) {}

	edit(issue: Issue) {
		let dialogRef = this.dialog.open(IssueEditDialogComponent, {data: issue, width: "600px"});
		dialogRef.afterClosed().subscribe(result => {
			if(result) {				
				this.router.navigate(['/projects', result.id, 'issues']);
			}
		});
	}
	
	create(project: Project) {
		
		const issue = new Issue();
		issue.project = project;
		
		let dialogRef = this.dialog.open(IssueEditDialogComponent, {data: issue, width: "600px"});
		dialogRef.afterClosed().subscribe(result => {
			if(result) {				
				this.router.navigate(['/projects', result.projectId, 'issues']);
			}
		});
	}
}

