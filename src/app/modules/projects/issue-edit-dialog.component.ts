import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProjectService} from './services/project.service';
import {MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import {AbstractForm} from '../../shared/form/abstract-form.component';
import {Observable} from 'rxjs/Observable';

import {Issue} from './models/issue.model';

@Component({
	selector: 'app-issue-edit-dialog',
  templateUrl: './issue-edit-dialog.component.html',
  styleUrls: ['./issue-edit-dialog.component.css']
})
export class IssueEditDialogComponent extends AbstractForm {
	
	constructor(		
		@Inject(MD_DIALOG_DATA) public data: Issue = null,
		protected fb: FormBuilder,
		private projectService: ProjectService,
		private dialogRef: MdDialogRef<IssueEditDialogComponent>
	) {	
		super(fb);	
		
		
		if(data) {
			this.form.patchValue(data);
		}
	}
	
	buildForm() {
		return this.fb.group({
			title: ['', Validators.compose([
				Validators.required
				])
			]			
		});
	}


	internalSubmit() {		
		Object.assign(this.data, this.form.value);
		return this.projectService.getIssuesService(this.data.project).save(this.data);				
	}
	
	onSuccess(data) {
		this.dialogRef.close(data);
	}
}
