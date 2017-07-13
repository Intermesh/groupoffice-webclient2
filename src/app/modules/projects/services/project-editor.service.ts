import {Injectable} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Router } from '@angular/router';

import {ProjectEditDialog} from '../project-edit-dialog.component';

@Injectable()
export class ProjectEditorService {
	
	constructor(private dialog: MdDialog, private router: Router) {}

	open() {
		let dialogRef = this.dialog.open(ProjectEditDialog, {width: "600px"});
		dialogRef.afterClosed().subscribe(result => {
			if(result) {				
				this.router.navigate(['/projects', result.id]);
			}
		});
	}
}

