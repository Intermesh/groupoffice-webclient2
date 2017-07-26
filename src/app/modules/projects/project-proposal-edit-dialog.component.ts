import {Component, OnInit, Inject, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProjectService} from './services/project.service';
import {MdDialogRef, MdDialog} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import {AbstractForm} from '../../shared/form/abstract-form.component';
import {Observable} from 'rxjs/Observable';

import {ProposalItem} from './models/project.model';

@Component({
	templateUrl: './project-proposal-edit-dialog.component.html'	
})
export class ProjectProposalEditDialog extends AbstractForm {
	
	constructor(		
		@Inject(MD_DIALOG_DATA) public data: ProposalItem = null,
		protected fb: FormBuilder,
		private projectService: ProjectService,
		private dialogRef: MdDialogRef<ProjectProposalEditDialog>
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
			],
			content: null,
			unitPrice: null,
			quantity: null,
			quantityInHours: null
			
			
		});
	}


	internalSubmit() {
		
		if(!this.data) {
			this.data = new ProposalItem();
		}
		
		Object.assign(this.data, this.form.value);
		return Observable.of(this.data);				
	}
	
	onSuccess(data) {
		this.dialogRef.close(data);
	}
}
