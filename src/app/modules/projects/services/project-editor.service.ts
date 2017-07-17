import {Injectable} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Router } from '@angular/router';
import {Project} from '../models/project.model';
import {ProjectEditDialog} from '../project-edit-dialog.component';

@Injectable()
export class ProjectEditorService {
	
	constructor(private dialog: MdDialog, private router: Router) {}

	open(project: Project = null) {
		let dialogRef = this.dialog.open(ProjectEditDialog, {data: project, width: "600px"});
		dialogRef.afterClosed().subscribe(result => {
			if(result) {				
				this.router.navigate(['/projects', result.id]);
			}
		});
	}
}

